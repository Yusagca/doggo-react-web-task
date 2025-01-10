'use client';

import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { CiImageOn } from 'react-icons/ci';
import { PiGif } from 'react-icons/pi';
import { PiChartBarHorizontalLight,PiSmiley,PiCalendarBlankLight } from "react-icons/pi";
type PostFormProps = {
  onSubmit: (content: string, tags: string[]) => void;
};

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content, []);
    setContent('');
  };
  const { currentUser } = useAppSelector((state) => state.posts);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-auto">
      <div className="flex items-start space-x-4">
        {/* Kullanıcı Profil Resmi */}
        <img
          src={currentUser.profileImage}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Textarea */}
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 resize-none border-none focus:ring-0 text-gray-800 text-lg placeholder-gray-500 outline-none"
          rows={2}
        />
      </div>

      {/* Alt Aksiyonlar */}
      <div className="flex items-center justify-between mt-3">
        {/* İkonlar */}
        <div className="flex space-x-4 text-orange-500">
          <button type="button">
            <CiImageOn className="text-3xl" />
          </button>
          <button type="button">
            <PiGif className="text-3xl" />
          </button>
          <button type="button">
            <PiChartBarHorizontalLight className="text-3xl" />
          </button>
          <button type="button">
            <PiSmiley className="text-3xl" />
          </button>
          <button type="button">
            <PiCalendarBlankLight className="text-3xl" />
          </button>
        </div>

        {/* Post Butonu */}
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
