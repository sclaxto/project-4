import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPhotoForm from "../../components/AddPhotoForm/AddPhotoForm";
import DisplayAll from "../../components/DisplayAll/DisplayAll";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as photosAPI from "../../utils/photoApi";

import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleLogout }){

    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({});
    

    async function handleAddPhoto(photo) {
        try {
          setLoading(true);
          const data = await photosAPI.create(photo); // our server is going to return
          // the created post, that will be inside of data, which is the response from
          // the server, we then want to set it in state
          console.log(data, " this is response from the server, in handleAddPost");
          setPhotos([data.photo, ...photos]);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(err.message);
        }
      }
    
      // R read in crud
      async function getPhotos() {
        try {
          const data = await photosAPI.getAll();
          console.log(data, " this is data,");
          setPhotos([...data.photos]);
          setLoading(false);
        } catch (err) {
          console.log(err.message, " this is the error");
          setError(err.message);
        }
      }
    
      // useEffect runs once
      // the component is first rendered (whenever you first view the component)
      // Component Lifecycle in react
      useEffect(() => {
        getPhotos();
      }, []);
    
    
    
      if (error) {
        return (
          <>
            <PageHeader handleLogout={handleLogout} user={user}/>
            <ErrorMessage error={error} />;
          </>
        );
      }
    
      if (loading) {
        return (
          <>
            <PageHeader handleLogout={handleLogout} user={user}/>
            <Loading />
          </>
        );
      } 
    
      return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <PageHeader handleLogout={handleLogout} user={user}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <AddPhotoForm handleAddPhoto={handleAddPhoto} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <DisplayAll
                photos={photos}
                numPhotosCol={3}
                isProfile={false}
                loading={loading}
                user={user}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    