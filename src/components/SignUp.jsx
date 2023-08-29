import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from 'firebase/auth';
import app from '../firebase/firebase'
import swal from 'sweetalert';
import { TailSpin } from "react-loader-spinner";
// import bcrypt from 'bcrypt';
import { addDoc } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const auth = getAuth(app);

function SignUp() {
  const nevigate= useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
  }

  const verifyOTP =() => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        nevigate("/login");
        setLoading(false);
      })
    }
    catch (error) {
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  }

  const uploadData= async () =>
  {
    const salt= bcrypt.genSaltSync(10);
    var hash= bcrypt.hashSync(form.password, salt);
    await addDoc(usersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile
    });
  }

  return (
    <div className='h-[85vh] grid place-items-center px-2'>
      {
        otpSent ?
          <>
            <div className='w-72 md:w-1/3 flex flex-col items-center justify-center px-4 py-6 gap-3 md:gap-5 bg-neutral-900'>
              <h1 className='text-xl md:text-3xl mb-3 md:mb-5 bg-green-300 w-full text-center text-black py-1 font-semibold'>Sign Up</h1>

              {/* mobile nbr */}
              <div className='w-full flex flex-col gap-2'>
                <label className='md:text-xl' htmlFor="">Enter OTP</label>
                <input
                  type="number"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  className='md:p-1 pl-3 text-black outline-none text-lg'
                />
              </div>

              <button onClick={verifyOTP} className='text-xl mt-3 md:mt-4 bg-green-600 text-center text-white px-6 rounded-md py-2 font-semibold hover:bg-green-700'>
                {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
              </button>

            </div>
          </>
          :
          <>
            <div className='w-72 md:w-1/3 flex flex-col items-center justify-center px-4 py-6 gap-3 md:gap-5 bg-neutral-900'>
              <h1 className='text-xl md:text-3xl mb-3 md:mb-5 bg-green-300 w-full text-center text-black py-1 font-semibold'>Sign Up</h1>

              {/* name */}
              <div className='w-full flex flex-col gap-2'>
                <label className='md:text-xl' htmlFor="">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className='md:p-1 pl-3 text-black outline-none text-lg'
                />
              </div>

              {/* mobile nbr */}
              <div className='w-full flex flex-col gap-2'>
                <label className='md:text-xl' htmlFor="">Mobile No.</label>
                <input
                  type="number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className='md:p-1 pl-3 text-black outline-none text-lg'
                />
              </div>

              {/* password */}
              <div className='w-full flex flex-col gap-2 text-lg'>
                <label className='md:text-xl' htmlFor="">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className='md:p-1 pl-3 text-black outline-none text-lg'
                />
              </div>

              <button onClick={requestOtp} className='text-xl mt-3 md:mt-4 bg-green-600 text-center text-white px-6 rounded-md py-1 md:py-2 font-semibold hover:bg-green-700'>
                {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
              </button>

              <div className='mt-2 text-xs md:text-base'>
                <Link to={"/login"}><p>Already have an account? <span className='text-blue-600'>Login</span></p></Link>
              </div>
              <div div id="recaptcha-container"></div>
            </div>
          </>
      }
    </div>
  )
}

export default SignUp;
