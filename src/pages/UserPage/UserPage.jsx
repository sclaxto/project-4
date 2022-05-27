import { useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react'
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import AboutMe from "../../components/AboutMe/AboutMe"
import DisplayAll from "../../components/DisplayAll/DisplayAll";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";
import * as likesAPI from '../../utils/likeApi';

export default function UserPage(props){  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [photos, setPhotos] = useState([]);

    const { username } = useParams();
    
    async function addLike(photoId){
      try {
        const data = await likesAPI.create(photoId)
        console.log(data, ' <- the response from the server when we make a like');
        getProfile(); // <- to go get the updated posts with the like
      } catch(err){
        console.log(err)
        setError(err.message)
      }
    }
  
    async function removeLike(likeId){
      try {
        const data = await likesAPI.removeLike(likeId);
        console.log(data, '<-  this is the response from the server when we remove a like')
        getProfile()
        
      } catch(err){
        console.log(err);
        setError(err.message);
      }
    }
    
    async function getProfile() {
      console.log(username, "<-this is the username")
        try {
          const data = await userService.getProfile(username);
          console.log(data, " < -- getProfile");
          setLoading(() => false);
          setUser(() => data.user);
          console.log(setUser, '<-setUser')
          setPhotos(() => data.photos);
        } catch (err) {
          console.log(err);
          setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
        }
      }
    
    
      // then when the component loads we can use that username to fetch all the users data
      // then we can store that in state
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
    
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <PageHeader />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AboutMe user={user} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column style={{ maxWidth: 750 }}>
            <DisplayAll
                isProfile={true}
                photos={photos}
                numPhotosCol={3}
                user={props.user}
                addLike={addLike}
                removeLike={removeLike}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    
    