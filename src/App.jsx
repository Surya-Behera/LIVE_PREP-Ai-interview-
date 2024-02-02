import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Header from './components/Header'
import Trendpg from './components/trendpg'

 

function App() {
  const handleSearch = (query) => {
    // Implement your search logic here, for now, just log the query
    console.log('Search query:', query);
  };

  return (
    <div className='bg-red-200 min-h-screen  md:w-[1100px] w-[500px]'> 
    <Router>
       <Header/>
      <Routes>
   
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/trendpg' element={<Trendpg/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
