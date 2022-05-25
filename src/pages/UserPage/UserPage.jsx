import React, { useState, useEffect } from "react";
import AddPhotoForm from '../../AddPhotoForm/AddPhotoForm'
import { Grid } from 'semantic-ui-react';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";




export default function UserPage(props){

    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const { username } = useParams();


    async function getProfile() {
        try {
          const data = await userService.getProfile(username);
          console.log(data, " < -- data");
          setLoading(() => false);
          setUser(() => data.user);
          setPhotos(() => data.photos);
        } catch (err) {
          console.log(err);
          setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
        }
      }

      useEffect(() => {
        getProfile();
      }, []);
    
    
    
    
      if (error) {
        return (
          <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <ErrorMessage error={error} />;
          </>
        );
      }
    
      if (loading) {
        return (
          <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <Loading />
          </>
        );
      }
    
    
      return(
    <>
     <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
        <PhotoBook
            isProfile={true}
            photos={photos}
            numPhotosCol={3}
            user={props.user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
 )
}