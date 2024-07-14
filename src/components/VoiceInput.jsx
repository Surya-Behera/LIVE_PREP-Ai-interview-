import React, { useState, useEffect, useRef } from 'react';
import InterviewForm from './InterviewForm';
import Markdown from 'react-markdown';

const VoiceInput = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [response, setResponse] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [quizState, setQuizState] = useState('NOT_STARTED');
  const [showForm, setShowForm] = useState(false);
  const [responseRead, setResponseRead] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    difficultyLevel: '',
    experience: ''
  });
  
  const questions = [
    `Hi ${formData.name}! Please introduce yourself briefly.`,
    "How do you declare a function in Python?",
    "How do you import a module in Python?",
    "How do you create a list in Python?",
    "What is the purpose of the 'if __name__ == \"__main__\":' statement?",
    "What is the difference between a tuple and a list in Python?",
    "How do you open a file for reading in Python?",
    "What is a dictionary in Python and how is it created?",
    "What is the purpose of the 'pass' statement in Python?",
    "How do you handle exceptions in Python?"
  ];

  const answers = [
    "Hello! I'm [Name], [age] years old, and I work as a [profession]. I have a passion for [hobby/interest] and enjoy [activity] in my free time. It's a pleasure to meet you!",
    "To declare a function in Python, use the 'def' keyword followed by the function name and parentheses for parameters. For example:\ndef greet(name):\n    print(f'Hello, {name}!')",
    "To import a module in Python, use the 'import' statement at the beginning of your script. You can import the entire module or specific functions. Examples:\nimport math\nfrom datetime import datetime",
    "Lists in Python are created using square brackets. You can create an empty list or initialize it with values. Examples:\nmy_list = []\nnumbers = [1, 2, 3, 4, 5]\nfruit = ['apple', 'banana', 'cherry']",
    "The 'if __name__ == \"__main__\":' statement is used to control the execution of code when a Python file is run as a script vs when it's imported as a module. Code inside this block only runs if the script is the main program.",
    "Tuples and lists are both sequence types, but tuples are immutable (can't be changed after creation) while lists are mutable. Tuples use parentheses (), lists use square brackets []. Tuples are often used for fixed data, lists for collections that might change.",
    "To open a file for reading in Python, use the 'open()' function with mode 'r'. It's best to use a 'with' statement to ensure the file is properly closed. Example:\nwith open('filename.txt', 'r') as file:\n    content = file.read()",
    "A dictionary in Python is an unordered collection of key-value pairs. It's created using curly braces {} or the dict() constructor. Example:\nmy_dict = {'name': 'Alice', 'age': 30}\nuser_info = dict(username='john_doe', email='john@example.com')",
    "The 'pass' statement in Python is a null operation used as a placeholder where syntactically some code is required, but no action is needed. It's often used in empty function definitions, loops, or conditional branches during development.",
    "Exception handling in Python uses try/except blocks. Place the code that might raise an exception in the 'try' block, and the code to handle exceptions in the 'except' block. You can catch specific exceptions or use a general except. Example:\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')"
  ];

  const synth = useRef(window.speechSynthesis);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      newRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setAnswer(transcript);
      };

      setRecognition(newRecognition);
    }
  }, []);

  useEffect(() => {
    if (quizState === 'READY' && currentQuestionIndex < questions.length) {
      readCurrentQuestion();
    }
  }, [quizState, currentQuestionIndex]);

  useEffect(() => {
    if (response && responseRead) {
      readAloud(response, moveToNextQuestion);
      setResponseRead(false);
    }
  }, [response, responseRead]);

  const handleStartInterview = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    startQuiz();
  };

  const startQuiz = () => {
    setQuizState('READY');
    setCurrentQuestionIndex(0);
    setQuestionHistory([]);
    readAloud(`Welcome, ${formData.name}. Let's begin the ${formData.subject} interview at the ${formData.difficultyLevel} level. Here's your first question.`);
  };

  const readCurrentQuestion = () => {
    readAloud(questions[currentQuestionIndex], () => setQuizState('ANSWERING'));
  };

  const startListening = () => {
    if (recognition && quizState === 'ANSWERING') {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setQuizState('EVALUATING');
      displayAnswer();
    }
  };

  const readAloud = (text, onEndCallback) => {
    if (synth.current) {
      setIsReading(true);
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      speech.onend = () => {
        setIsReading(false);
        if (onEndCallback) onEndCallback();
      };
      synth.current.speak(speech);
    } else {
      console.log('Text-to-speech not supported in this browser.');
      if (onEndCallback) onEndCallback();
    }
  };

  const displayAnswer = () => {
    const correctAnswer = answers[currentQuestionIndex];
    setResponse(`Here's the correct answer:\n\n${correctAnswer}`);
    setResponseRead(true);
    
    setQuestionHistory(prevHistory => [
      ...prevHistory,
      {
        question: questions[currentQuestionIndex],
        answer: answer,
        correctAnswer: correctAnswer
      }
    ]);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setAnswer('');
      setResponse('');
      setQuizState('READY');
    } else {
      setQuizState('COMPLETE');
      readAloud(`That was the last question, ${formData.name}. The interview is complete.`);
    }
  };

  return (
    <div className='p-10'>
      <div className='w-full flex justify-center items-center flex-col'>
        <h2 className='text-2xl font-semibold font-serif mb-5 text-black'>Live Interview</h2> 
      </div>
      {quizState === 'NOT_STARTED' ? (
        <>
          <p className=' font-serif'>
            <span className='text-red-600 font-semibold text-lg font-serif'>Instructions :</span><br></br>
            Welcome to your live interview! I'm your AI interviewer, ready to assess your skills
            based on the information you provide. Here's how it works:
            <ol className='list-disc ml-10 m-2'>
              <li>First, click on live interview and fill the basic form.</li>
              <li>I'll ask you a series of questions from your form input tailored to your experience level.</li>
              <li>When you're ready to answer, click the "Start Answering" button and speak your response clearly.</li>
              <li>Once you've finished, click "Submit Answer" to submit your response.</li>
              <li>I'll then provide the correct answer for your reference.</li>
              <li>We'll go through several questions to thoroughly cover the topic.</li>
            </ol>

            Remember, this is your chance to practice and learn. Speak clearly and explain your thought process.
            Are you ready to begin? When you feel prepared, click the "Start Interview" button below to begin. 
            Good luck!
          </p>
        
          <div className='flex justify-center mt-5'>
            {!showForm ? (
              <button onClick={handleStartInterview} className='px-2 py-1 bg-green-600 text-white font-serif rounded-md'>
                Start Now
              </button>
            ) : (
              <div className=' fixed inset-0 bg-black  bg-opacity-50 w-full h-screen flex items-center justify-center '>
              <div className='p-5 bg-white rounded-md'>
              <InterviewForm 
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
              />
              </div>
              </div>
            )}
          </div>
        </>
      ) : quizState !== 'COMPLETE' ? (
        <>
          <p className='text-lg font-semibold mb-1'>Question {currentQuestionIndex + 1} of {questions.length}:</p>
          <p className='mb-1'>{questions[currentQuestionIndex]}</p>
          <button onClick={startListening} disabled={isListening || quizState !== 'ANSWERING'} className='px-2 py-1 bg-green-600 text-white text-sm rounded-md mr-2'>
            Start Answering
          </button>
          <button onClick={stopListening} disabled={!isListening || quizState !== 'ANSWERING'} className='px-2 py-1 bg-cyan-600 text-white text-sm rounded-md'>
            Submit Answer
          </button>
          <div className='m-2 '>
            <h3 className='font-serif font-semibold'>Your Answer:</h3>
            <p>{answer}</p>
          </div>
          <div className='m-2 '>
              <h3 className='font-serif font-semibold'>Correct Answer:</h3>
              <Markdown>{response}</Markdown>
          </div>
        </>
      ) : (
        <p>Interview completed!</p>
      )}
    </div>
  );
};

export default VoiceInput;