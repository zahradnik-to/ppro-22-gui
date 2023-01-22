import {useParams} from "react-router-dom";
import {useGetEvent, useUpdateEvent} from "../api/useEvent";
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useState} from "react";
import {getMockEvent} from "../mock/mock-helper";

export default function EventUpdatePage() {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [descriptionShort, setDescriptionShort] = useState(null);
  const [descriptionLong, setDescriptionLong] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);

  const [event, eventLoaded, error] = useGetEvent({id}, getMockEvent());
  const [updateResult, _, updateError, executeUpdate] = useUpdateEvent();

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedEvent = {
      name,
      descriptionShort,
      descriptionLong,
      address,
      image,
    }
    executeUpdate(updatedEvent);
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  if (!eventLoaded) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <Box
      autoComplete="off"
      noValidate
      mx={2}
    >
      <form onSubmit={handleSubmit}>
        <Typography gutterBottom variant={"h3"} component="h1">Update event</Typography>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={event.name} onChange={(e) => setName(e.target.value)} />
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Address" defaultValue={event.address} onChange={(e) => setAddress(e.target.value)} />
        <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={event.image} inputProps={{ accept: "image/*"}} />
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Short description" defaultValue={event.descriptionShort} multiline minRows={1} onChange={(e) => setDescriptionShort(e.target.value)}/>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Long description" defaultValue={event.descriptionLong} multiline minRows={3} onChange={(e) => setDescriptionLong(e.target.value)}/>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" type={"submit"}>Submit!</Button>
        </Box>
      </form>
    </Box>
  );
}
