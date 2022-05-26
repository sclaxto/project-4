import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PhotoCard from '../PhotoCard/PhotoCard';
import Loader from '../Loader/Loader';

    export default function PhotoBook({photos, numPhotosCol, isProfile, loading, user }){

        return (
            <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
              <Segment>
                <Dimmer active inverted>
                  <Loader size="small">Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            ) : null}
            {photos.map((photo) => {
              return (
                <PhotoCard
                  photo={photo}
                  key={photo._id}
                  isProfile={isProfile}
                  user={user}
                />
              );
            })}
          </Card.Group>
        )
        }
