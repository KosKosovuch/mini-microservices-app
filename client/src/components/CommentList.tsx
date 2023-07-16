import type { Comments } from "../types";

export default function CommentList({ comments }: { comments: Comments }) {
  return (
    <ul>
      {Object.values(comments).map((comment) => {
        let content;

        if (comment.status === "approved") {
          content = comment.content;
        } else if (comment.status === "pending") {
          content = "This comment is awaiting moderation";
        } else {
          content = "This comment has been rejected";
        }

        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
}
