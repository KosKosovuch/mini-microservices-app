import axios from "axios";
import { useState, useEffect } from "react";
import CreateComment from "./CreateComment.tsx";
import CommentList from "./CommentList.tsx";
import type { Posts } from "../types";

export default function PostList() {
  const [posts, setPosts] = useState<Posts>({});

  const fetchPosts = async () => {
    const { data } = await axios.get<Posts>("http://localhost:4002/posts");

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts().catch((err) => console.error(err));
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card" key={post.id} style={{ width: "32%" }}>
        <div className="card-body">
          <h3>{post.title}</h3>

          <CommentList comments={post.comments} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap gap-2">{renderedPosts}</div>;
}
