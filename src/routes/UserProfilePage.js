import useAuth from "../api/hooks/useAuth";
import {useGetUser, useUpdateUser} from "../api/useUser";
import {getMockUser} from "../mock/mock-helper";
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useState} from "react";

function UserProfilePage() {
  const {auth} = useAuth();
  const [user, loaded, error] = useGetUser({id: auth.user.id}, getMockUser());
  const [updateResult, updateLoaded, updateError, executeUpdate] = useUpdateUser();

  const [password, setPassword] = useState(null);

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [image, setImage] = useState(null);

  if (!loaded) {
    return <LinearProgress color="secondary"/>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedEvent = {
      email,
      password,
      name,
      companyName,
      city,
      street,
      zipCode,
      phone,
      image,
    }
    executeUpdate(updatedEvent);
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
        <Typography gutterBottom variant={"h3"} component="h1">Update event</Typography>
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={user.name} onChange={(e) => setName(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
        { user?.roles?.includes("seller")
          ? <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Company name" defaultValue={user.companyName} onChange={(e) => setCompanyName(e.target.value)} />
          : <></>
        }
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Phone" defaultValue={user.phone} multiline minRows={1} onChange={(e) => setPhone(e.target.value)}/>
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="City" defaultValue={user.city} onChange={(e) => setCity(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Street & No." defaultValue={user.street} onChange={(e) => setStreet(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Zip code" defaultValue={user.zipCode} multiline minRows={1} onChange={(e) => setZipCode(e.target.value)}/>
        <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={user.image} inputProps={{ accept: "image/*"}} />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" type={"submit"}>Save changes</Button>
        </Box>
      </form>
    </Box>
  );
}

export default UserProfilePage;