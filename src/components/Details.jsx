import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import Reviews from './Reviews';

function Details() {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    image: "",
    year: "",
    description: "",
    rating: 0,
    rated: 0
  })

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }

    getData();
  }, [])

  return (
    <div>
      {
        loading ? <div className='h-[92vh] grid place-items-center'><ThreeDots /></div> :

          <div className='flex flex-col p-3 md:p-0 md:w-3/4 mx-auto mt-5 md:mt-10 md:flex-row'>
            {/* image */}
            <img className="h-2/5 w-2/3 mx-auto md:h-[35rem] md:sticky md:top-28" src={data.image} alt="" />

            {/* details */}
            <div className='pt-2 md:p-2 md:pl-3'>

              {/* heading */}
              <h1 className='text-lg md:text-3xl text-zinc-300 font-semibold'>{data.title} <span className='text-xs md:text-xl'>({data.year})</span></h1>

              {/* rating */}
              <ReactStars
                size={20}
                value={data.rating/data.rated}
                half={true}
                edit={false}
              />

              {/* description */}
              <p className='mt-1 text-xs text-justify md:text-lg md:mt-4'>{data.description}</p>

              <Reviews id={id} previousRating= {data.rating} userRated={data.rated}/>
            </div>
          </div>
      }
    </div>
  )
}

export default Details
