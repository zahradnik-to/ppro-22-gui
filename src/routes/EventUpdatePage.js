import {useParams} from "react-router-dom";
import {useGetEvent, useUpdateEvent} from "../api/useEvent";
import {Box, Button, TextField, Typography} from "@mui/material";
import {getMockEvent} from "../mock/mock-helper";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {MuiFileInput} from "mui-file-input";
import {useState} from "react";

export default function EventUpdatePage() {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [descriptionShort, setDescriptionShort] = useState(null);
  const [descriptionLong, setDescriptionLong] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);

  const { id } = useParams();
  let [event, loaded, error] = useGetEvent({id});
  event = getMockEvent();

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedEvent = {
      name,
      price,
      descriptionShort,
      descriptionLong,
      address,
      image,
    }
    useUpdateEvent(updatedEvent);
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  return (
    <Box
      component='form'
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      mx={2}
    >
      <Typography gutterBottom variant={"h3"} component="h1">Update event</Typography>
      <TextField sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={event.name} onChange={(e) => setName(e.target.value)} />
      <TextField sx={{my: 2}} fullWidth variant="outlined" label="Price" defaultValue={event.price} type="number" inputProps={{ min: 1}} onChange={(e) => setPrice(e.target.value)}/>
      <TextField sx={{my: 2}} fullWidth variant="outlined" label="Address" defaultValue={event.address} onChange={(e) => setAddress(e.target.value)} />
      <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={event.image} inputProps={{ accept: "image/*"}} />
      <TextField sx={{my: 2}} fullWidth variant="outlined" label="Short description" defaultValue={event.descriptionShort} multiline minRows={1} onChange={(e) => setDescriptionShort(e.target.value)}/>
      <TextField sx={{my: 2}} fullWidth variant="outlined" label="Long description" defaultValue={event.descriptionLong} multiline minRows={3} onChange={(e) => setDescriptionLong(e.target.value)}/>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" type={"submit"}>Submit!</Button>
      </Box>
    </Box>
  );
}