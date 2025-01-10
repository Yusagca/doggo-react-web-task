"use client";

import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import PostCard from "../components/PostCard";
import { IoMdArrowBack } from "react-icons/io";
import { Post } from "../store/postsSlice";

export default function Bookmarks() {
  const { posts, likedPosts } = useAppSelector((state) => state.posts); // Redux'tan posts ve likedPosts al

  // Beğenilen postları filtrele
  const bookmarkedPosts: Post[] = posts.filter((post: Post) =>
    likedPosts.includes(post.id)
  );

  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Tam ekran görünüm için seçilen post

  return (
    <div className="container mx-auto p-6">
      {!selectedPost ? (
        <>
          {/* Normal Görünüm */}
          <h1 className="text-3xl font-bold mb-4">Bookmarks</h1>
          {bookmarkedPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {bookmarkedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  profileImage={post.profileImage}
                  content={post.content || ""} // Null durumunda boş string
                  likes={post.likes}
                  reposts={post.reposts}
                  tags={post.tags}
                  comments={post.comments || []}
                  onOpenFullView={() => setSelectedPost(post)} // Tam ekran görünüm için tıklama işlevi
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Henüz herhangi bir post beğenmediniz.</p>
          )}
        </>
      ) : (
        <>
          {/* Tam Ekran Görünüm */}
          <div className="flex flex-col h-screen overflow-y-auto bg-white p-6">
            <button
              onClick={() => setSelectedPost(null)} // Tam ekran görünümden çık
              className="text-orange-500 hover:underline text-start mb-4"
            >
              <IoMdArrowBack className="text-xl" />
            </button>

            {/* Seçilen Post */}
            <PostCard
              id={selectedPost.id}
              username={selectedPost.username}
              profileImage={selectedPost.profileImage}
              content={selectedPost.content || ""}
              likes={selectedPost.likes}
              reposts={selectedPost.reposts}
              tags={selectedPost.tags}
              comments={selectedPost.comments || []}
              isFullView // Tam ekran görünümde olduğumuzu belirtmek için
            />
          </div>
        </>
      )}
    </div>
  );
}
