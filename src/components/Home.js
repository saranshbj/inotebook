import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const Home =()=> {
  const context = useContext(NoteContext)
  const {notes, setNotes} = context;

  return (
    <div>
      <div className="container my-3">s
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" classNameName="btn btn-primary">
          Submit
        </button>
      </form>
      <h1>Yore Notes</h1>
      <h1>{notes.map((note)=> {
        return note.title;
      })}
      </h1>
      </div>
    </div>
  );
}

export default Home;
