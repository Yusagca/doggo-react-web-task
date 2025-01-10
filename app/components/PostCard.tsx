"use client";

import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLike } from "../store/postsSlice";
import { TfiComment } from "react-icons/tfi";
import { IoIosHeartEmpty,IoMdHeart } from "react-icons/io";
import { LiaRetweetSolid } from "react-icons/lia";
import { RxShare2 } from "react-icons/rx";
import { Comment } from "../store/types"; // Doğru yolu belirtin


type PostCardProps = {
  id: string;
  username: string;
  profileImage?: string;
  content: string;
  likes: number;
  reposts: number;
  tags: string[];
  comments: Comment[];
  isFullView?: boolean;
  onOpenFullView?: () => void;
  onResize?: (newHeight: number) => void; // onResize özelliğini ekledik
};

const getRandomProfileImage = (username: string) => {
  const basePath = username.length % 2 === 0 ? 'men' : 'women';
  const index =
    Array.from(username).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    100;
  return `https://randomuser.me/api/portraits/${basePath}/${index}.jpg`;
};

const PostCard = ({
  id,
  username,
  profileImage,
  content,
  tags,
  comments,
  isFullView,
  onOpenFullView,
}: PostCardProps) => {
  const dispatch = useAppDispatch();
  const likedPosts = useAppSelector((state) => state.posts.likedPosts);
  const isLiked = likedPosts.includes(id);

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  return (
    <div
      className={`flex flex-col bg-white  ${
        isFullView ? "p-6 rounded-lg border" : "p-4 border-b"
      }`}
    >
      {/* Üst Kısım */}
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={profileImage || getRandomProfileImage(username)}
            alt={`${username}'s profile`}
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-semibold text-black">{username}</p>
            <p className="text-sm text-gray-500">{`@${username} • 5m`}</p>
          </div>
        </div>
        {!isFullView && (
          <FiMoreHorizontal className="text-gray-500 text-xl cursor-pointer" />
        )}
      </div>

      {/* İçerik */}
      <div className="mt-3 text-gray-800 text-base">
        <p>{content}</p>
      </div>

      {/* Görsel (Opsiyonel) */}
      {tags.includes("image") && (
        <div className="mt-3">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Post visual"
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Alt Kısım */}
      {!isFullView && (
        <div className="flex items-center gap-10 justify-evenly mt-3 text-gray-500 text-sm">
          <button
            className="flex items-center hover:text-blue-500 transition"
            onClick={onOpenFullView}
          >
            <TfiComment className="mr-2 text-lg" />
          </button>
          <button className="flex items-center hover:text-green-500 transition">
            <LiaRetweetSolid className="mr-2 text-xl" />
          </button>
          <button
            className={`flex items-center ${
              isLiked ? "text-red-500" : "hover:text-red-500"
            } transition`}
            onClick={handleLike}
          >
            {isLiked ? <IoMdHeart className="mr-2 text-xl"/> : <IoIosHeartEmpty className="mr-2 text-xl" />}
          </button>
          <button className="flex items-center hover:text-orange-500 transition">
            <RxShare2 className="mr-2 text-xl" />
          </button>
        </div>
      )}

      {/* Yorumlar */}
      {isFullView && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Yorumlar</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm">
                  <span className="font-semibold">{comment.username}:</span>{" "}
                  {comment.content}
                </p>
                <p className='text-xs text-gray-500'>
                {new Date(comment.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Bu gönderi için yorum bulunmamaktadır.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
