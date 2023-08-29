import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

function Reviews({ id, previousRating, userRated }) {
  const nevigate= useNavigate();
  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);

  const sendReviews = async () => {
    setLoading(true);
    try {

      if (useAppstate.login) {
        await addDoc(reviewsRef, {
          moviesId: id,
          name: useAppstate.userName,
          rating: rating,
          review: form,
          timestamp: new Date().getTime()
        })

        const ref = doc(db, "movies", id);

        await updateDoc(ref, {
          rating: previousRating + rating,
          rated: userRated + 1
        })

        setLoading(false);
        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1);

        swal({
          title: "Reviews Successful",
          icon: "success",
          buttons: false,
          timer: 3000
        })
      }
      else
      {
        nevigate("/login");
      }

    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })

    }
  }

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      let quer = query(reviewsRef, where('moviesId', '==', id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      })

      setReviewsLoading(false);
    }

    getData();
  }, [newAdded])

  return (
    <div className='mt-8 pt-5 border-t-2 border-neutral-500'>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />

      <input
        type="text"
        name=""
        id=""
        placeholder='Write your reviews...'
        value={form}
        onChange={(e) => setForm(e.target.value)}
        className='w-full p-1 pl-3 text-white outline-none bg-neutral-800 text-lg'
      />

      <button onClick={sendReviews} className='w-full py-1 md:py-2 text-lg grid place-items-center bg-green-600 font-semibold'>
        {
          loading ? <TailSpin height={30} color='white' /> : 'Share'
        }
      </button>

      {
        reviewsLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={15} color='white' /></div> :

          data.map((element, index) => {
            return (
              <div key={index} className='mt-3 md:mt-6 border-b border-neutral-700 pb-2'>

                <div className='flex items-center mb-1'>
                  <h1 className='md:text-lg text-blue-500'>{element.name}</h1>
                  <h1 className='ml-6 text-xs'>({new Date(element.timestamp).toLocaleString()})</h1>
                </div>

                <ReactStars
                  size={16}
                  edit={false}
                  half={true}
                  value={element.rating}
                />

                <h1 className='mt-1 md:text-lg'>{element.review}</h1>
              </div>
            )
          })
      }
    </div>
  )
}

export default Reviews;
