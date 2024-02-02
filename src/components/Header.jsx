 import React from 'react'
 import { Link } from 'react-router-dom'
 function Header() {
   return (
    
     
    <nav className="bg-gray-800 p-[6px] md:w-full w-[500px] h-[40px]">
      <ul className="flex flex-row justify-start gap-8">
        <li className='h-[30px]  md:mr-10 mr-4 ' >
         <img src='/involeadlogo.png' className='h-[30px]'></img>
        </li>
       <li className="md:mr-6 mr-1">
         <Link to="/home" className="text-white">Home</Link>
       </li>
       <li className="md:mr-6 mr-1">
         <Link to="/about" className="text-white">Explore</Link>
       </li>
       <li className="md:mr-6 mr-1">
         <Link to="/trendpg" className="text-white">Trending now</Link>
       </li>
     </ul>
   </nav>
  
   )
 }
 
 export default Header