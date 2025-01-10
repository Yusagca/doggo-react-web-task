'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiMenu, BiHomeCircle } from 'react-icons/bi';
import { GoHash, GoBookmark } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import PostForm from '../components/PostForm'; // PostForm bileşenini içe aktar
import { addPost } from '../store/postsSlice';

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.posts);

  const [isOpen, setIsOpen] = useState(false); // Hamburger menü durumu
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu

  const links = [
    { href: '/home', label: 'Home', icon: <BiHomeCircle /> },
    { href: '/explore', label: 'Explore', icon: <GoHash /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <GoBookmark /> },
    { href: '/profile', label: 'Profile', icon: <CiUser /> },
  ];

  const handleNewPost = (content: string, tags: string[]) => {
    const newPost = {
      id: Date.now().toString(),
      username: currentUser.username,
      profileImage: currentUser.profileImage,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      tags,
      images: [],
      comments: [],
    };

    dispatch(addPost(newPost)); // Redux'a yeni postu ekle
    setIsModalOpen(false); // Modalı kapat
  };

  return (
    <div className="relative h-screen bg-white flex flex-col">
      {/* Hamburger Button (Sadece Mobilde Görünür) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-3xl text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiMenu />
      </button>

      {/* Sidebar (Mobilde Açılıp Kapanır) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0 lg:static`}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col mt-10 space-y-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-8 py-3 text-lg font-medium ${
                pathname === href
                  ? 'text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setIsOpen(false)} // Mobilde menüyü kapat
            >
              <span className="text-2xl mr-4">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* New Post Button */}
        <div className="px-8 mt-10">
          <button
            className="w-full py-3 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            New Post
          </button>
        </div>
      </div>

      {/* Current User Info */}
      <div
        className={`fixed bottom-0 left-0 w-64 px-8 py-6 bg-white z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center">
          <img
            src={currentUser.profileImage}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <p className="text-sm font-semibold text-gray-800">
              {currentUser.username}
            </p>
            <p className="text-xs text-gray-500">@{currentUser.username}</p>
          </div>
        </div>
      </div>

      {/* Overlay (Mobil Menüyü kapatmak için) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-4 lg:mx-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Create a New Post
            </h2>
            <PostForm onSubmit={handleNewPost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
