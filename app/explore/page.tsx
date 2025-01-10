"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPosts, fetchMorePosts, Post } from "../store/postsSlice";
import PostCard from "../components/PostCard";
import { IoMdArrowBack } from "react-icons/io";
import { VariableSizeList as List } from "react-window";

export default function Explore() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasMore } = useAppSelector(
    (state) => state.posts
  );

  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const listRef = useRef<List>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [listHeight, setListHeight] = useState<number>(0); // Liste yüksekliği için state

  // İstemci tarafında liste yüksekliğini ayarla
  useEffect(() => {
    if (typeof window !== "undefined") {
      setListHeight(window.innerHeight - 150); // Varsayılan yüksekliği ayarla
    }
  }, []);

  // Postları yükle ve etiketleri çıkar
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(20)).then(() => extractTags(posts));
    } else {
      extractTags(posts);
      setItemHeights(Array(posts.length).fill(180)); // Varsayılan yükseklik
    }
  }, [dispatch, posts]);

  // Etiketleri çıkar
  const extractTags = (posts: Post[]) => {
    const allTags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => allTags.add(tag));
    });
    setTags(Array.from(allTags));
  };

  // Daha fazla post yükleme
  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    dispatch(fetchMorePosts({ limit: 20, offset: posts.length }));
  };

  // Filtrelenmiş postlar
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  // Eleman boyutlarını güncelle
  const handleResize = (index: number, newHeight: number) => {
    setItemHeights((prevHeights) => {
      const updatedHeights = [...prevHeights];
      updatedHeights[index] = newHeight;
      return updatedHeights;
    });
    listRef.current?.resetAfterIndex(index); // Listeyi yeniden render et
  };

  const getItemSize = (index: number) => itemHeights[index] || 180;

  // Hata durumunda mesaj göster
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {!selectedPost ? (
        <>
          {/* Normal Explore Sayfası */}
          <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">Explore Posts</h1>

          {/* Etiket Filtreleme */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-2 rounded-full bg-opacity-65 transition-all ${
                  selectedTag === tag
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-orange-400 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Virtualized Post List */}
          <div className="flex-1 overflow-y-auto">
            {listHeight > 0 && (
              <List
                height={listHeight} // Liste yüksekliği state üzerinden alınıyor
                itemCount={filteredPosts.length}
                itemSize={getItemSize}
                ref={listRef}
                onItemsRendered={({ visibleStopIndex }) => {
                  if (visibleStopIndex >= filteredPosts.length - 1) {
                    loadMorePosts(); // Son öğeye ulaşıldığında daha fazla yükle
                  }
                }}
                width="100%"
              >
                {({ index, style }) => (
                  <div style={style}>
                    <PostCard
                      id={filteredPosts[index].id}
                      username={filteredPosts[index].username}
                      profileImage={filteredPosts[index].profileImage}
                      content={filteredPosts[index].content || ""}
                      likes={filteredPosts[index].likes}
                      reposts={filteredPosts[index].reposts}
                      tags={filteredPosts[index].tags}
                      comments={filteredPosts[index].comments || []}
                      onResize={(newHeight) => handleResize(index, newHeight)}
                      onOpenFullView={() => setSelectedPost(filteredPosts[index])}
                    />
                  </div>
                )}
              </List>
            )}
          </div>

          {loading && <div className="text-center mt-4">Loading...</div>}
        </>
      ) : (
        <>
          {/* Tam Ekran Görünüm */}
          <div className="flex flex-col h-screen overflow-y-auto bg-white p-6">
            <button
              onClick={() => setSelectedPost(null)} // Tam ekran görünümden çık
              className="text-orange-500 text-start text-xl hover:underline mb-4"
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
              isFullView
            />
          </div>
        </>
      )}
    </div>
  );
}
