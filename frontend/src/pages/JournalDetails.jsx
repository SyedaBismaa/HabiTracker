import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { useParams } from "react-router-dom";

const JournalDetails = () => {
  const { id } = useParams();

  const [journal, setJournal] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // images: array of URLs
  const [images, setImages] = useState([]);

  // ==============================
  // FETCH JOURNAL BY ID
  // ==============================
  useEffect(() => {
    if (id !== "new") fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    const res = await axios.get(`http://localhost:3000/journals`, {
      withCredentials: true,
    });

    const found = res.data.journals.find((j) => j._id === id);

    if (found) {
      setJournal(found);
      setTitle(found.title);
      setContent(found.content);
      setImages(found.images || []);
    }
  };

  // ==============================
  // AUTO SAVE WHEN TYPING
  // ==============================
  useEffect(() => {
    if (!id) return;

    const delay = setTimeout(() => {
      saveJournal();
    }, 700);

    return () => clearTimeout(delay);
  }, [title, content]);

  const saveJournal = async () => {
    if (id === "new") {
      await axios.post(
        "http://localhost:3000/journals",
        { title, content, images },
        { withCredentials: true }
      );
      return;
    }

    await axios.put(
      `http://localhost:3000/journals/${id}`,
      { title, content, images },
      { withCredentials: true }
    );
  };

  // ==============================
  // IMAGE UPLOAD
  // ==============================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);


    const res = await axios.post(
      "http://localhost:3000/journals/upload",
      form,
      { withCredentials: true }
    );

    const url = res.data.url;

    const newImages = [...images, url];
    setImages(newImages);

    await saveJournal();
  };

 
  const handleDeleteImage = async (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    // Save after deletion
    await saveJournal();
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <DashboardLayout />

      <div className="w-full p-8 relative">

        {/* Sticky Title + Add Image */}
        <div className="flex justify-between items-center sticky top-0 bg-gray-900 py-1 z-20">
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl bg-transparent border-b border-gray-700 p-2 outline-none"
          />

          <label className="ml-4 border border-gray-600 rounded-lg px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700">
            + Add Image
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

         
       {/* Writing Area */}
<div className="w-full flex flex-col lg:flex-row gap-6 mt-6">

  {/* Text area */}
  <div className="writing w-full lg:w-1/2 bg-gray-800 rounded-2xl ">
    <textarea
      placeholder="Start writing..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full p-6 bg-transparent min-h-[300px] lg:min-h-[600px] outline-none resize-none text-lg leading-relaxed"
    />
  </div>

  {/* Images */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-1/2 max-w-2xl">
    {images.map((img, index) => (
      <div key={index} className="relative w-full h-[220px] sm:h-[200px]">
        <img
          src={img}
          className="w-full h-full object-cover rounded-lg border border-gray-700"
        />
        <button
          onClick={() => handleDeleteImage(index)}
          className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm"
        >
          ✕
        </button>
      </div>
    ))}
  </div>

</div>


      </div>
    </div>
  );
};

export default JournalDetails;
