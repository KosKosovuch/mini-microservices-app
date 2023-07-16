import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

export default function CreateComment({ postId }: { postId: string }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setContent("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="comment">Add a comment</label>

          <textarea
            placeholder="Enter your comment here"
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Add comment</button>
      </form>
    </div>
  );
}
