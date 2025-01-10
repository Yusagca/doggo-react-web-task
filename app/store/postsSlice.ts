import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface Comment {
  username: string;
  content: string;
  timestamp: string;
}

export type Post = {
  id: string;
  username: string;
  content: string | null;
  timestamp: string;
  likes: number;
  reposts: number;
  tags: string[];
  images: string[];
  comments?: Comment[];
  profileImage?: string;
}

interface CurrentUser {
  username: string;
  profileImage: string;
  posts: Post[]; // Kullanıcının oluşturduğu postlar
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean; // Daha fazla post olup olmadığını kontrol etmek için
  likedPosts: string[]; // Beğenilen postların ID'lerini tutar
  currentUser: CurrentUser; // Geçerli kullanıcının bilgileri
}

// Rastgele profil fotoğrafı belirlemek için yardımcı fonksiyon
const getRandomProfileImage = (username: string) => {
  const basePath = username.length % 2 === 0 ? "men" : "women";
  const index =
    Array.from(username).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    20;
  return `https://randomuser.me/api/portraits/${basePath}/${index}.jpg`;
};

// Başlangıç state
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  likedPosts: [],
  currentUser: {
    username: "current_user",
    profileImage: getRandomProfileImage("current_user"), // Rastgele avatar
    posts: [], // Kullanıcının oluşturduğu postlar
  },
};

// İlk 20 postu çekme
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (limit: number) => {
    const response = await fetch(`http://localhost:3001/posts?_limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return (await response.json()) as Post[];
  }
);

// Daha fazla post çekme (sayfa sonuna geldikçe)
export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMorePosts",
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const response = await fetch(
      `http://localhost:3001/posts?_limit=${limit}&_start=${offset}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch more posts");
    }
    const data = await response.json();
    return data as Post[];
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Beğenme durumunu değiştirir
    toggleLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      if (state.likedPosts.includes(postId)) {
        state.likedPosts = state.likedPosts.filter((id) => id !== postId);
      } else {
        state.likedPosts.push(postId);
      }
    },
    // Yeni bir post ekler
    addPost: (state, action: PayloadAction<Post>) => {
      const newPost = action.payload;
      state.posts.unshift(newPost); // Postları listeye ekle
      if (newPost.username === state.currentUser.username) {
        state.currentUser.posts.unshift(newPost); // Kullanıcıya ait postları da güncelle
      }
    },
    // Kullanıcının bilgilerini günceller
    updateCurrentUser: (state, action: PayloadAction<Partial<CurrentUser>>) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchMorePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchMorePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch more posts";
      });
  },
});

export const { toggleLike, addPost, updateCurrentUser } = postsSlice.actions;
export default postsSlice.reducer;
