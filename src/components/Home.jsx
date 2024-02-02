import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

 

 

const Home = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);}
    // const navigate = useNavigate();
    const handleSearch = () => {
      // Pass the search query to the parent component or perform search logic here
      onSearch(query);
    };
  return (
   <> 
   <div className='w-full   flex md:flex-row flex-col'>
        <div className='w-[500px]  h-[250px] md:mt-7 mt-2   flex justify-center items-center'>
          <div>
         <p className='text-3xl font-extrabold text-black'>Exploring<span className='text-lg font-semibold'>    trends</span></p>
         <pre className='text-sm mt-1 '>  helps you for</pre>
         <p className='text-3xl font-extrabold text-black ml-8'>Exponential<span className='text-lg font-semibold'>    Growth</span></p>
         </div>
        </div>
      <div className="md:mt-[130px] mt-[1px]">
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
     
    </div>
    <div className='md:w-[1060px] w-[470px] h-[180px] border-2 border-black flex items-center justify-center m-3'>
      Results
     </div>
    {/* <button onClick={()=>navigate('/about')}>go about</button>
    <img src='/photo.png'></img> */}
   </>
  )
}


export default Home