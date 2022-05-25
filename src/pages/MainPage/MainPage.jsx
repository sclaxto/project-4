import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'


export default function AddNewPhoto(props){  
    const [selectedFile, setSelectedFile] = useState('');
    const [state, setState] = useState({
        description: ''
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
        formData.append('caption', state.caption)
        props.handleAddPhoto(formData);
    }
    return (
        <>
        <span>The Main Page</span>
        </>
    )
}