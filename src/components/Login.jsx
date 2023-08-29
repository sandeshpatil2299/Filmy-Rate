import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs} from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import swal from 'sweetalert';
import { Appstate } from '../App';

function Login() {
  const useAppstate= useContext(Appstate);
  const nevigate= useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);

  const login= async () =>
  {
    setLoading(true);
    try {
      const quer= query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot= await getDocs(quer);

      querySnapshot.forEach((doc) =>
      {
        const _data= doc.data();
        const isUser= bcrypt.compareSync(form.password, _data.password);

        if(isUser)
        {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            text: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          nevigate("/");
        } 
        else
        {
          swal({
            text: "Invalid Credintials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      })
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  }

  return (
    <div className='h-[85vh] grid place-items-center px-2'>
      <div className='w-72 md:w-1/3 flex flex-col items-center justify-center px-4 py-6 gap-3 md:gap-5 bg-neutral-900'>
        <h1 className='text-xl md:text-3xl mb-3 md:mb-5 bg-green-300 w-full text-center text-black py-1 font-semibold'>User Login</h1>

        {/* mobile nbr */}
        <div className='w-full flex flex-col gap-2'>
          <label className='md:text-xl' htmlFor="">Mobile No.</label>
          <input
            type="number"
            name=""
            id=""
            value={form.mobile}
            onChange={(e) => setForm({...form, mobile: e.target.value})}
            className='md:p-1 pl-3 text-black outline-none text-lg'
          />
        </div>

        {/* password */}
        <div className='w-full flex flex-col gap-2 text-lg'>
          <label className='md:text-xl' htmlFor="">Password</label>
          <input
            type="password"
            name=""
            id=""
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className='md:p-1 pl-3 text-black outline-none text-lg'
          />
        </div>

        <button onClick={login} className='text-xl mt-3 md:mt-4 bg-green-600 text-center text-white px-6 rounded-md py-1 md:py-2 font-semibold hover:bg-green-700'>Login</button>

        <div className='mt-2 text-sm md:text-lg'>
          <Link to={"/signup"}><p>Do not have account? <span className='text-blue-600'>Sign Up</span></p></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
