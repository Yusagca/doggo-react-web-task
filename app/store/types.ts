export type Comment = {
    username: string;
    content: string;
    timestamp: string;
  };
  
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
  };
  