import React from 'react'
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'

const About = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);}
    // const navigate = useNavigate();
    const handleSearch = () => {
      // Pass the search query to the parent component or perform search logic here
      onSearch(query);
    };



    //for selection value
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');

  const country = [
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Japan',
    'China',
    'Australia',
    'Brazil',
    'India',
  ];
  const time = [
    'Select a time period range',
    'Today',
    'Last Day',
    'Past Month',
    'Past Year',
    'Past 5 Years',
    'Past 12 Years',
    ];
  const catagory = [
    'Select a company category',
    'IT',
    'Pharmaceuticals',
    'Food and Beverage',
    'Finance',
    'Telecommunications',
    'Healthcare',
    'Automotive',
    'Retail',
  ];

  const handleSelect1Change = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleSelect2Change = (e) => {
    setSelectedOption2(e.target.value);
  };

  const handleSelect3Change = (e) => {
    setSelectedOption3(e.target.value);
  };
    // const navigate = useNavigate();

     

  return (
   <>
   
    {/* <div>About</div>
    <button onClick={()=>navigate('/home')}>go </button> */}
     <div className="mt-[30px] md:ml-[300px] ml-6">
         <input
         type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="border p-2 rounded-md focus:outline-none mr-1 h-[45px] w-[350px] ml-4"
        />
       <button
        onClick={handleSearch}
        className="bg-blue-500  p-2 rounded-r h-[42px] hover:bg-teal-500 text-black"
        >
        Search
       </button>
     </div>
     



     {/* for selection barr */}
     <div className="flex flex-row items-center mt-6 gap-4  md:ml-3 ml-20">
      {/* Selection Field 1 */}
      <div className="mb-4">
       
        <select
          value={selectedOption1}
          onChange={handleSelect1Change}
          className="border p-2 rounded"
        >
          <option value="">Country</option>
          {country.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Selection Field 2 */}
      <div className="mb-4">
        
        <select
          value={selectedOption2}
          onChange={handleSelect2Change}
          className="border p-2 rounded"
        >
          <option value="">Time</option>
          {time.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Selection Field 3 */}
      <div className="mb-4">
        
        <select
          value={selectedOption3}
          onChange={handleSelect3Change}
          className="border p-2 rounded"
        >
          <option value="">Catagory</option>
          {catagory.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      </div>
      
      <div className='md:w-[1060px] w-[460px] md:h-[280px] h-[450px] border-2 border-black flex items-center justify-center m-5'>
      Results
     </div>
   </>
  )
}

export default About