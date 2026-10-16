import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);

  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    const response = await axios.post(
      "http://localhost:3000/api/food/create",
      formData,
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
    navigate("/");
  } catch (error) {
    console.log(
      "Food creation error:",
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-lg">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/15 text-3xl">
            🍔
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create Food
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Share your delicious food with everyone.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-gray-900 p-5 shadow-xl sm:p-8"
        >
          {/* Video Input */}
          <div>
            <label
              htmlFor="foodVideo"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Food Video
            </label>

            <label
              htmlFor="foodVideo"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-gray-950/70 px-4 py-8 text-center transition hover:border-orange-500"
            >
              <span className="mb-3 text-4xl">📹</span>

              <span className="text-sm font-medium text-gray-200">
                Choose your food video
              </span>

              <span className="mt-1 text-xs text-gray-500">
                MP4, MOV or other supported video formats
              </span>

              <input
                id="foodVideo"
                type="file"
                accept="video/*"
                className="sr-only"
                onChange={(e) =>
                  setVideo(e.target.files?.[0] || null)
                }
                required
              />
            </label>

            {video && (
              <p className="mt-2 break-all text-sm text-green-400">
                Selected: {video.name}
              </p>
            )}
          </div>

          {/* Food Name */}
          <div>
            <label
              htmlFor="foodName"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Food Name
            </label>

            <input
              id="foodName"
              type="text"
              placeholder="e.g. Cheese Burger"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="foodDescription"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Description
            </label>

            <textarea
              id="foodDescription"
              rows="4"
              placeholder="Tell us about your delicious food..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
          >
            Create Food
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          Make it delicious. Make it memorable.
        </p>
      </div>
    </div>
  );
};

export default CreateFood;