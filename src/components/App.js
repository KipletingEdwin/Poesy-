import React, { useState, useEffect } from "react";
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

function App() {
  const [show, setShow] = useState(true);
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8004/poems")
      .then((res) => res.json())
      .then((poems) => setPoems(poems));
  }, []);

  //call function to handle click
  function handleClick() {
    setShow(!show);
  }

  function updateForms(poem) {
    setPoems([...poems, poem]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={handleClick}>Show/hide new poem form</button>
        {show ? <NewPoemForm updateForms={updateForms} /> : null}
      </div>
      <PoemsContainer poems={poems} setPoems={setPoems} />
    </div>
  );
}

export default App;
