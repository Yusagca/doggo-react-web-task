"use client";

import { FaTimes } from "react-icons/fa";
import { Post } from "../store/types";

const PostModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative overflow-y-auto max-h-screen">
        {/* Çarpı Butonu */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Kullanıcı Bilgileri */}
        <div className="flex items-center mb-4">
          <img
            src={post.profileImage}
            alt={`${post.username}'s profile`}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-semibold text-black">{post.username}</p>
            <p className="text-sm text-gray-500">{`@${post.username}`}</p>
          </div>
        </div>

        {/* Post İçeriği */}
        <div className="mt-3 text-gray-800 text-base">
          <p>{post.content}</p>
        </div>

        {/* Görseller (Opsiyonel) */}
        {post.images && post.images.length > 0 && (
          <div className="mt-4">
            {post.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt="Post visual"
                className="w-full rounded-lg object-cover mb-4"
              />
            ))}
          </div>
        )}

        {/* Yorumlar */}
        <div className="mt-6">
  <h3 className="text-lg font-bold mb-4">Yorumlar</h3>
  {post.comments && post.comments.length > 0 ? (
    post.comments.map((comment, index) => (
      <div key={index} className="mb-4">
        <p className="text-sm">
          <span className="font-semibold">{comment.username}:</span>{" "}
          {comment.content}
        </p>
        <p className="text-xs text-gray-500">{comment.timestamp}</p>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">
      Bu gönderi için yorum bulunmamaktadır.
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default PostModal;
