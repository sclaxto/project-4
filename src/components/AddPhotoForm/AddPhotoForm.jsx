import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddPhotoForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    Description: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('about me', state.description)
    props.handleAddPhoto(formData); 
    
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder="Tells us about the photo"
                  onChange={handleChange}
                  required
              />   
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                ADD A New Photo
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}