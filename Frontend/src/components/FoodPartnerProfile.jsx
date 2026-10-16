import axios from 'axios';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom"

const FoodPartnerProfile = () => {
  const {id} = useParams()
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials: true})
    .then(response => {
       setProfile(response.data.foodPartner);
      setVideos(
        Array.isArray(response.data.foodItems)
        ? response.data.foodItems 
        : []
      );
    })
  }, [id]);

  if (!profile) {
  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      Loading profile...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lg">

        {/* Business Profile */}
        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/20 bg-muted">
              <img
                src="https://placehold.co/200x200"
                alt="Business profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Business Details */}
            <div className="min-w-0 flex-1 space-y-2">
              <h2 className="truncate rounded-lg border border-white/10 bg-muted px-3 py-2 text-center font-semibold">
                {profile.fullName}
              </h2>

              <p className="rounded-lg border border-white/10 bg-muted px-3 py-2 text-center text-sm">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Business Stats */}
          <div className="mt-7 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Meals
              </p>
              <p className="mt-1 text-xl font-semibold">43</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Customers Served
              </p>
              <p className="mt-1 text-xl font-semibold">15K</p>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 border-t border-white/20">
          {videos
          .filter((item) => item && item.video)
          .map((item, index) => (
            <div
              key={item._id}
              className="relative aspect-[3/4] overflow-hidden border-b border-r border-white/10 bg-muted"
            >
              <video
                src={item.video}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload='metadata'
              />

              {/* Placeholder when no video is available */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="rounded-md bg-black/40 px-2 py-1 text-xs text-white">
                  Video {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FoodPartnerProfile;