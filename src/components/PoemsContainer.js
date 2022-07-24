import React, { useState } from "react";

import Poem from "./Poem";

function PoemsContainer({ poems, setPoems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategory(e) {
    setSelectedCategory(e.target.value);
  }
  function updatePoems(data) {
    const updatedPoems = poems.map((poem) => {
      if (poem.id === data.id) {
        return data;
      }
      return poem;
    });
    setPoems(updatedPoems);
  }

  function onDelete(id) {
    const updated = poems.filter((poem) => {
      return poem.id !== id;
    });
    setPoems(updated);
  }

  const allPoemsfiltered = poems.filter((poem) => {
    if (selectedCategory === "All") return true;
    return poem.favourite === true && selectedCategory === "favourite";
  });
  const allPoems = allPoemsfiltered.map((poem, index) => {
    return (
      <Poem
        key={index}
        id={poem.id}
        fav={poem.favourite}
        title={poem.title}
        content={poem.content}
        author={poem.author}
        updatePoems={updatePoems}
        onDelete={onDelete}
      />
    );
  });

  return (
    <div className="poems-container">
      <select
        className="but"
        onChange={handleCategory}
        value={selectedCategory}
      >
        <option value="All">All Poems</option>
        <option value="favourite">Favourites</option>
      </select>

      {allPoems}
    </div>
  );
}
export default PoemsContainer;
