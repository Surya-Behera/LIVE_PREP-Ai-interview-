 import React, { useState, useEffect } from 'react';
 function Trendpg() {
    const [topic, settopic] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
  
    useEffect(() => {
      // Fetch text data from the backend API for div 1
      fetch('YOUR_BACKEND_API_URL/text1')
        .then(response => response.json())
        .then(data => settopic(data.text));
  
      // Fetch text data from the backend API for div 2
      fetch('YOUR_BACKEND_API_URL/text2')
        .then(response => response.json())
        .then(data => setText2(data.text));
  
      // Fetch text data from the backend API for div 3
      fetch('YOUR_BACKEND_API_URL/text3')
        .then(response => response.json())
        .then(data => setText3(data.text));
    }, []);
  return (
    <>
     <div className='w-full h-[900px] bg-green-500 p-4' >
      <div className="text-container w-[1060px] h-[200px] bg-green-100 m-4">{topic}</div>
      <div className="text-container   w-[1060px] h-[200px] bg-green-100 m-4">{text2}</div>
      <div className="text-container  w-[1060px] h-[200px] bg-green-100 m-4">{text3}</div>
    </div>
     </>
  )
}

export default Trendpg