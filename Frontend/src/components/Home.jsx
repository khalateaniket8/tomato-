import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
     const [videos, setVideos] = useState([]); 
     
     useEffect(() => {
      axios.get("http://localhost:3000/api/food/get",{withCredentials: true})
      .then(response => {
        setVideos(response.data.food || [])
      })
     }, []);

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll bg-black">
      {videos.map((item) => (
        <section
          key={item._id}
          className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black"
        >
          {/* Background Video */}
          <video
            src={item.video}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

          {/* Description + Visit Store */}
          <div className="absolute bottom-10 left-5 right-5 z-10">
            <p className="mb-4 line-clamp-2 max-w-xl text-sm leading-6 text-white">
              {item.description}
            </p>

            <Link
            to={`/food-partner/${item.foodPartner}`}
              className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Visit Store
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;