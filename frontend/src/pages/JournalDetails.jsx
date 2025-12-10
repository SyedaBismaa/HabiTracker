import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const JournalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id !== "new") fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    const res = await axios.get(`http://localhost:3000/journals`, {
      withCredentials: true,
    });

    const found = res.data.journals.find((j) => j._id === id);

    if (found) {
      setTitle(found.title);
      setContent(found.content);
      setImages(found.images || []);
    }
  };

  // Auto-save
  useEffect(() => {
    const delay = setTimeout(() => saveJournal(), 700);
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

    setImages([...images, res.data.url]);
    await saveJournal();
  };

  const handleDeleteImage = async (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    await saveJournal();
  };

  return (
    <DashboardLayout>
      <div className="w-full p-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/journals")}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
        >
          <ArrowLeft size={20} /> Back to Journals
        </button>

        {/* Sticky Header */}
        <div className="flex justify-between items-center sticky top-0 bg-gray-900 pb-3 pt-2 z-20 border-b border-gray-700">
          <input
            placeholder="Journal Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl bg-transparent p-2 outline-none border-b border-gray-700 focus:border-indigo-500 transition"
          />

          <label className="ml-4 border border-gray-600 rounded-lg px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 transition">
            + Add Image
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          {/* Writing Area */}
          <div className="w-full lg:w-1/2 bg-gray-800 rounded-2xl border border-gray-700 p-4">
            <textarea
              placeholder="Start writing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[350px] lg:min-h-[600px] bg-transparent outline-none resize-none text-lg leading-relaxed"
            />
          </div>

          {/* Images Section */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <img
                  src={img}
                  className="w-full h-52 object-cover border border-gray-700 rounded-lg"
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
    </DashboardLayout>
  );
};

export default JournalDetails;
