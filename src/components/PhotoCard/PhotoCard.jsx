import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";



function PhotoCard({ photo, isProfile, user, removeLike, addLike }) {
  // call the addLike or the removeLike when we click on the heart!

  // We need to know if the logged in user has liked this particular post!
  // we search the array of objects that is post.likes to see if the logged in users
  // id exists in that array of objects
  const likeIndex = photo.likes.findIndex(
    (like) => like.username === user.username
  );

  const clickHandler =
    likeIndex > -1
      ? () => removeLike(photo.likes[likeIndex]._id)
      : () => addLike(photo._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the post
  // and the clicked handler should removeLike
  const likeColor = likeIndex > -1 ? "red" : "grey";
 
  
  return (
    <Card key={photo._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${photo.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  photo.user.photoUrl
                    ? photo.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {photo.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Image src={`${photo.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{photo.description}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
      <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {photo.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PhotoCard;
