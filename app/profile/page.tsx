'use client';

import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import PostCard from '../components/PostCard';
import { IoMdArrowBack } from 'react-icons/io';
import { Post } from '../store/types'; // Merkezi tür import edildi

export default function Profile() {
  const { currentUser } = useAppSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {!selectedPost ? (
        <>
          {/* Kullanıcı Bilgileri ve Arka Plan */}
          <div className="relative">
            <div className="bg-orange-500 h-48 w-full"></div>
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
              <img
                src={currentUser.profileImage}
                alt={`${currentUser.username}'s profile`}
                className="w-28 h-28 rounded-full border-4 border-white"
              />
              <div className="text-center mt-2">
                <h1 className="text-xl font-bold text-black">{currentUser.username}</h1>
                <p className="text-gray-500">@{currentUser.username}</p>
              </div>
            </div>
          </div>

          {/* Kullanıcı Postları */}
          <div className="mt-24 container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Posts</h2>

            {currentUser.posts?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {currentUser.posts.map((post: Post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    profileImage={post.profileImage || ""}
                    content={post.content || ""}
                    likes={post.likes}
                    reposts={post.reposts}
                    tags={post.tags}
                    comments={post.comments || []} // Varsayılan değer
                    onOpenFullView={() => setSelectedPost(post)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">Henüz postunuz yok.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Tam Ekran Görünüm */}
          <div className="flex flex-col h-screen overflow-y-auto bg-white p-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-orange-500 text-start hover:underline mb-4"
            >
              <IoMdArrowBack className="text-xl" />
            </button>

            {/* Seçilen Post */}
            <PostCard
              id={selectedPost.id}
              username={selectedPost.username}
              profileImage={selectedPost.profileImage || ""}
              content={selectedPost.content || ""}
              likes={selectedPost.likes}
              reposts={selectedPost.reposts}
              tags={selectedPost.tags}
              comments={selectedPost.comments || []} // Varsayılan değer
              isFullView
            />
          </div>
        </>
      )}
    </div>
  );
}
