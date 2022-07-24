import React, { useState } from "react";

function Poem({ id, title, content, author, fav, updatePoems, onDelete }) {
  const [isRead, setIsRed] = useState(false);
  // const [favourite, SetFavourite] = useState(fav);

  const read = () => {
    setIsRed((isRead) => !isRead);
  };

  function changeFav() {
    fetch(`http://localhost:8004/poems/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
      },
      body: JSON.stringify({ favourite: !fav }),
    })
      .then((response) => response.json())
      .then((data) => {
        // SetFavourite(!favourite)
        updatePoems(data);
      })

      .catch((error) => console.log(error));
  }

  function handleDelete(e) {
    fetch(`http://localhost:8004/poems/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => onDelete(id));
  }

  return (
    <div id={id}>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>
        <strong>{author}</strong>
      </p>
      <button onClick={read}>
        {isRead ? "Mark as read" : "Mark as unread"}
      </button>

      <button onClick={changeFav}>
        {fav ? "Remove from Fav" : "Add To Fav"}
      </button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Poem;
