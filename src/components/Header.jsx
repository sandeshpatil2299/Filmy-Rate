import React, { useContext } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
   const useAppState = useContext(Appstate);
   return (
      <div className='border-b-2 border-zinc-700 sticky top-0 z-10 bg-gray-Black'>
         <div className='container mx-auto flex items-center justify-between p-4'>
            {/* logo */}
            <div className="logo text-red-600 text-xl font-bold md:text-4xl">
               <Link to={"/"}>Filmy<span className='text-white'>Rate</span></Link>
            </div>

            {/* add button */}
            <div className='text-lg md:text-2xl'>
               {
                  useAppState.login ? 
                  <Link to={"/addMovie"}>
                     <a href="#" className='flex items-center font-bold'>
                        <AddBoxIcon fontSize='small' className='mr-1' />
                        Add New
                     </a>
                  </Link>
                  :
                  <Link to={"/login"}>
                  <a href="#" className='text-[15px] md:text-xl bg-red-500 px-3 py-1 rounded-md hover:bg-red-600'>
                     Login
                  </a>
               </Link>
               }
            </div>
         </div>
      </div>
   )
}

export default Header
