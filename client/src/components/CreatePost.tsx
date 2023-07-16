import axios from "axios";
import { useState } from "react";
export const CreatePost = () => {
  const [title, setTitle] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    await axios.post("http://localhost:4000/posts", {
      title
    }).finally(() => {
      setTitle("")
    })
  }

  return (
    <>
      <h3>Create Post</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            type="text" 
            className="form-control" 
            id="title" 
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}