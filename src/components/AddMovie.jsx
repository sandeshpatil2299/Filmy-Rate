import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
   const useAppstate = useContext(Appstate);
   const nevigate= useNavigate();
   const [form, setForm] = useState({
      title: "",
      year: "",
      image: "",
      description: "",
      rated: 0,
      rating: 0
   });

   const [loading, setLoading] = useState(false);

   const addMovie = async () => {
      setLoading(true);

      try {
         if (useAppstate.login) {
            await addDoc(moviesRef, form);
            swal({
               title: "Successfully Added",
               icon: "success",
               buttons: false,
               timer: 3000
            })

            setForm(
               {
                  title: "",
                  year: "",
                  description: "",
                  image: ""
               }
            )
         }

         else
         {
            nevigate("/login");
         }

      } catch (error) {

      }
      setLoading(false);
   }

   return (
      <div className='h-[90vh] md:grid md:place-items-center'>
         <div className='text-zinc-300 text-lg p-3 md:p-0 md:text-xl md:w-2/3'>
            <div className="heading text-2xl text-red-700 font-bold text-center my-5 md:mb-5 md:text-4xl">
               Add <span className='text-orange-500'>Movie</span>
            </div>

            {/* title and year */}
            <div>
               <div className='flex flex-col md:flex-row md:gap-5'>

                  {/* title */}
                  <div className='flex flex-col gap-1 mb-3 md:mb-0 md:w-1/2 '>
                     <label htmlFor="title" >
                        Title
                     </label>
                     <input
                        type="text"
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className='rounded-md h-7 pl-3 text-black focus:text-black focus:outline-none md:focus:text-xl md:h-10'
                     />
                  </div>

                  {/* year */}
                  <div className='flex flex-col md:w-1/2 gap-1'>
                     <label
                        htmlFor="year"
                        className=''>Year
                     </label>
                     <input
                        type="text"
                        name="year"
                        id="year"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        className='rounded-md h-7 pl-3 text-black focus:text-black focus:outline-none md:focus:text-xl md:h-10'
                     />
                  </div>
               </div>
            </div>

            {/* image link */}
            <div className='mt-3 md:mt-5'>
               <div className='flex flex-col gap-1'>
                  <label
                     htmlFor="imageLink"
                     className=''>Image Link
                  </label>
                  <input
                     type="text"
                     name="imageLink"
                     id="imageLink"
                     value={form.image}
                     onChange={(e) => setForm({ ...form, image: e.target.value })}
                     className='rounded-md h-7 pl-3 text-black focus:text-black focus:outline-none md:focus:text-xl md:h-10'
                  />
               </div>
            </div>

            {/* description */}
            <div className='mt-3 md:mt-5'>
               <div className='flex flex-col gap-1'>
                  <label
                     htmlFor="description"
                     className=''>Description
                  </label>
                  <textarea
                     name=""
                     id=""
                     rows="7"
                     value={form.description}
                     onChange={(e) => setForm({ ...form, description: e.target.value })}
                     className='rounded-md pl-3 pt-3 text-black focus:text-black focus:outline-none md:text-xl'>
                  </textarea>
               </div>
            </div>

            {/* submit button */}
            <div className='mt-8 text-xl grid place-items-center'>
               <a href="#"
                  onClick={addMovie}
                  className='bg-green-700 py-2 px-5 rounded-lg hover:bg-green-800'>
                  {loading ? <TailSpin height={25} color='white' /> : "Submit"}
               </a>
            </div>
         </div>
      </div>
   )
}

export default AddMovie