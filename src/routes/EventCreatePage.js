import {useParams} from "react-router-dom";
import {useCreateEvent, useGetEvent, useUpdateEvent} from "../api/useEvent";
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useState} from "react";

export default function EventCreatePage() {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [descriptionShort, setDescriptionShort] = useState(null);
  const [descriptionLong, setDescriptionLong] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);

  const [createResult, _, createError, executeCreate] = useCreateEvent();

  const handleSubmit = (e) => {
    e.preventDefault()
    const createdEvent = {
      name,
      descriptionShort,
      descriptionLong,
      address,
      image,
    }
    executeCreate(createdEvent);
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  return (
    <Box
      autoComplete="off"
      noValidate
      mx={2}
    >
      <form onSubmit={handleSubmit}>
        <Typography gutterBottom variant={"h3"} component="h1">Create event</Typography>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={null} onChange={(e) => setName(e.target.value)} />
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Address" defaultValue={null} onChange={(e) => setAddress(e.target.value)} />
        <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={null} inputProps={{ accept: "image/*"}} />
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Short description" defaultValue={null} multiline minRows={1} onChange={(e) => setDescriptionShort(e.target.value)}/>
        <TextField sx={{my: 2}} fullWidth variant="outlined" label="Long description" defaultValue={null} multiline minRows={3} onChange={(e) => setDescriptionLong(e.target.value)}/>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" type={"submit"}>Submit!</Button>
        </Box>
      </form>
    </Box>
  );
}
