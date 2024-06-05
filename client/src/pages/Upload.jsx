
import React, { useState } from 'react';
import axios from 'axios';



function Upload() {



  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostImageName, setNewPostImageName] = useState('');

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newPostImage);
    axios.post('/upload', formData)
    // axios.post('http://localhost:3001/upload', formData)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }



  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;
    setNewPostImage(file);
    setNewPostImageName(file.name);
    console.log(newPostImage);

  };







  return (
    <div className="App">

      <form onSubmit={upload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newPostImageName && (
          <div>
            <h6>Selected Image: {newPostImageName}</h6>
            <img
              style={{ width: '50%' }}
              src={URL.createObjectURL(newPostImage)}
              alt={newPostImageName}
            />

          </div>
        )}
        <button type="submit">Upload</button>
      </form>

    </div>
  );
}

export default Upload;


