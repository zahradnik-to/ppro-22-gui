import {useParams} from "react-router-dom";
import {useGetEvent, useUpdateEvent} from "../api/useEvent";
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useEffect, useState} from "react";
import useAuth from "../api/hooks/useAuth";

export default function EventUpdatePage() {
  const { auth } = useAuth();
  const { eventId } = useParams();
  const [name, setName] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  const [eventResult, eventLoaded, error] = useGetEvent({eventId});
  const [updateResult, _, updateError, executeUpdate] = useUpdateEvent();

  const [message, setMessage] = useState({});

  useEffect(()=> {
    if (updateResult?.status === 200) {
      setMessage({color: "green", text: "Event successfully updated."})
    } else if (updateError) {
      setMessage({color: "red", text: "Error occured."})
    }
  }, [updateResult])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedEvent = {
      ownerId: auth?.user?.id,
      id: eventId,
      name: name || eventResult?.data?.name,
      shortDescription: shortDescription || eventResult?.data?.shortDescription,
      description: description || eventResult?.data?.description,
      image: image || eventResult?.data?.image,
    }
    executeUpdate(updatedEvent);
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  if (!eventLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const event = eventResult?.data;

  return (
    <Box
      autoComplete="off"
      noValidate
      mx={2}
    >
      <form onSubmit={handleSubmit}>
        <Typography gutterBottom variant={"h3"} component="h1">Update event</Typography>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={event.name} onChange={(e) => setName(e.target.value)} />
        <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={"Select new image"} inputProps={{ accept: "image/*"}} />
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Short description" defaultValue={event.shortDescription} multiline minRows={1} onChange={(e) => setShortDescription(e.target.value)}/>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Description" defaultValue={event.description} multiline minRows={3} onChange={(e) => setDescription(e.target.value)}/>
        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} sx={{justifyContent:"space-between"}}>
          <Typography variant={'h6'} color={message.color}>{message.text}</Typography>
          <Button variant="contained" type={"submit"}>Submit!</Button>
        </Box>
      </form>
    </Box>
  );
}
