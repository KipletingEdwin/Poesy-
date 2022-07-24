import React, { useState } from "react";

function NewPoemForm({ updateForms }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    
  });

  //function to handle submit of the forms

  function handleSubmitForm(e) {
    e.preventDefault();

    //fetch data from api

    if (
      formData.title === "" ||
      formData.author === "" ||
      formData.content === ""
    ) {
      alert("All fields are required");
    } else {
      fetch("http://localhost:8004/poems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          updateForms(data);
          //Update our form
          setFormData({ ...formData, title: "", author: "", content: "" });
        });
    }
  }

  //Get changes within our form and update states
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <form className="new-poem-form" onSubmit={handleSubmitForm}>
      <input
        placeholder="Title "
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        placeholder="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
      />
      <textarea
        placeholder="Write your masterpiece here..."
        name="content"
        rows={10}
        value={formData.content}
        onChange={handleChange}
      />
      <input type="submit" value="Share your masterpiece" />
    </form>
  );
}

export default NewPoemForm;
