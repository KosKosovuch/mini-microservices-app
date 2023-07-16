import { CreatePost } from "./components/CreatePost";
import PostList from "./components/PostList";

function App() {
  return (
    <main className="container pb-5">
      <h1 className="py-5 text-center">Blog App</h1>

      <CreatePost />

      <hr className="my-5" />

      <h3>Posts List</h3>
      <PostList />
    </main>
  );
}

export default App;
