"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPosts, fetchMorePosts, addPost, Post } from "../store/postsSlice"; // Post tipi ekliyoruz
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { IoMdArrowBack } from "react-icons/io";
import { VariableSizeList as List } from "react-window";

// Tip tanımları
type PostItemProps = {
  index: number;
  style: React.CSSProperties;
};

// Home Component
export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, currentUser, hasMore } = useAppSelector(
    (state) => state.posts
  );

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const listRef = useRef<List | null>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [listHeight, setListHeight] = useState<number>(0); // Liste yüksekliği için state

  // İlk yüklemede postları getir
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(100));
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    setItemHeights(Array(posts.length).fill(200)); // Varsayılan yükseklik
  }, [posts]);

  // Liste yüksekliğini ayarla
  useEffect(() => {
    if (typeof window !== "undefined") {
      setListHeight(window.innerHeight - 100); // Tarayıcı yüksekliği
    }
  }, []);

  // Dinamik boyut ayarlama
  const handleResize = (index: number, newHeight: number) => {
    setItemHeights((prevHeights) => {
      const updatedHeights = [...prevHeights];
      updatedHeights[index] = newHeight;
      return updatedHeights;
    });
    listRef.current?.resetAfterIndex(index); // Listeyi yeniden render et
  };

  const getItemSize = (index: number) => itemHeights[index] || 200;

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    dispatch(fetchMorePosts({ limit: 100, offset: posts.length }));
  };

  // Yeni bir post eklemek için
  const handleNewPost = (content: string, tags: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      username: currentUser?.username || "unknown",
      profileImage: currentUser?.profileImage || "",
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      tags,
      images: [],
      comments: [],
    };

    dispatch(addPost(newPost));
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  const renderPostItem = ({ index, style }: PostItemProps) => {
    if (index === 0) {
      return (
        <div style={style}>
          <div className="bg-white px-6 py-4 h-auto border-b border-gray-200">
            <PostForm onSubmit={handleNewPost} />
          </div>
        </div>
      );
    }

    const post = posts[index - 1];
    return (
      <div style={style}>
        <PostCard
          id={post.id}
          username={post.username}
          profileImage={post.profileImage}
          content={post.content || ""}
          likes={post.likes}
          reposts={post.reposts}
          tags={post.tags}
          comments={post.comments || []}
          onOpenFullView={() => setSelectedPost(post)} // Tam ekran görünüm
          onResize={(newHeight) => handleResize(index - 1, newHeight)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {!selectedPost ? (
        <>
          {/* Normal Görünüm */}
          <header className="flex justify-between items-center bg-white px-6 py-4">
            <h1 className="text-xl font-bold text-gray-700 mx-5">Home</h1>
          </header>

          <div className="flex-1 overflow-y-auto">
            {/* Virtualized Post List */}
            {listHeight > 0 && (
              <List
                height={listHeight} // Tarayıcı yüksekliği state üzerinden
                itemCount={posts.length + 1} // PostForm'u da listeye ekliyoruz
                itemSize={(index) =>
                  index === 0 ? 150 : getItemSize(index - 1)
                }
                ref={listRef}
                onItemsRendered={({ visibleStopIndex }) => {
                  if (visibleStopIndex >= posts.length - 1) {
                    loadMorePosts(); // Son öğeye ulaşıldığında daha fazla yükle
                  }
                }}
                width="100%"
              >
                {renderPostItem}
              </List>
            )}

            {loading && <div className="text-center mt-4">Loading...</div>}
          </div>
        </>
      ) : (
        <>
          {/* Tam Ekran Görünüm */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <button
              onClick={() => setSelectedPost(null)} // Tam ekran görünümden çık
              className="text-orange-500 hover:text-orange-600 transition-all"
            >
              <IoMdArrowBack className="text-xl" />
            </button>

            <div className="mt-6">
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
          </div>
        </>
      )}
    </div>
  );
}
