import React, { useEffect } from 'react'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      async function getData() {
         setLoading(true);

         const _data = await getDocs(moviesRef);
         _data.forEach((doc) => {
            setData((previousData) =>
               [
                  ...previousData, { ...(doc.data()), id: doc.id }
               ])
         })

         setLoading(false);

      }

      getData();
   }, []);

   return (
      <div className='container flex flex-wrap justify-between mx-auto p-2 mt-2 cursor-pointer md:p-4 md:mt-4'>
         {/* movie card */}
         {loading ? <div className='h-[89vh] w-full grid place-items-center'> <ThreeDots height={30} color='white' /> </div> :      
            data.map((element, index) => {
               return (
                  <Link to={`/details/${element.id}`}>
                     <div key={index} className='w-40 bg-zinc-900 p-1 mb-3 rounded-md hover:scale-105 transition-all duration-500 md:w-72 md:p-3 md:m-3 md:mb-4'>
                        <img src={element.image} alt="" className='h-40 w-32 rounded-md mx-auto md:h-96 md:w-full' />

                        {/* movie details */}
                        <div className='flex pt-2 text-xs md:text-xl'>
                           <div className='text-left text-gray-400'>
                              <h1>Title</h1>
                              <h1>Rating</h1>
                              <h1>Year</h1>
                           </div>

                           <div className='ml-2'>
                              <h1>:</h1>
                              <h1>:</h1>
                              <h1>:</h1>
                           </div>

                           <div className='text-left ml-2'>
                              <h1 className='line-clamp-1'>{element.title}</h1>
                              <h1>
                                 <ReactStars
                                    size={20}
                                    value={element.rating/element.rated}
                                    half={true}
                                    edit={false}
                                 />
                              </h1>
                              <h1>{element.year}</h1>
                           </div>
                        </div>
                     </div>
                  </Link>
               )
            })
         }
      </div>
   )
}

export default Cards
