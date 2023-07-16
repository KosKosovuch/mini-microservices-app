export type Post = {
  id: string;
  title: string;
  comments: Comments;
};

export type Posts = Record<string, Post>;

export type Comment = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

export type Comments = Comment[];
