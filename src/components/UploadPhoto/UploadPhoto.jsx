import React from 'react';


export default function Feed ({user, handleLogout}) {
    const [photos, setPhotos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    async function handleAddPhoto(photo) {
        try {
          setLoading(true);
          const data = await photoAPI.create(photo); // our server is going to return
          // the created post, that will be inside of data, which is the response from
          // the server, we then want to set it in state
          console.log(data, " this is response from the server, in handleAddPost");
          setPosts([data.post, ...posts]);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(err.message);
        }
      } 

}