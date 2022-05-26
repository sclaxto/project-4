import { useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react'
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import AboutMe from "../../components/AboutMe/AboutMe"
import DisplayAll from "../../components/DisplayAll/DisplayAll";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function MainPage(props){  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [photos, setPhotos] = useState([]);

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
              <PageHeader handleLogout={props.handleLogout} user={props.user}/>
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
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    