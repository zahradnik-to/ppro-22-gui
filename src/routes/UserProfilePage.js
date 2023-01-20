import useAuth from "../api/hooks/useAuth";
import {useGetUser, useUpdateUserInfo} from "../api/useUser";
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useEffect, useState} from "react";

function UserProfilePage() {
  const {auth} = useAuth();
  const [getResult, getLoaded, error] = useGetUser({ username: auth?.user?.username } );
  const [updateResult, updateLoaded, updateError, executeUpdate] = useUpdateUserInfo();
  const [user, setUser] = useState({});


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [description, setDescription] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (updateResult?.status === 200) {
      console.log("UPDATE OK", updateResult)
    }
    console.log("UPDATE NOT-OK", updateResult)
  }, [updateResult])

  if (!getLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      ...getResult?.data?.user,
      email,
      password,
      name,
      surname,
      description,
      companyName,
      city,
      street,
      zipCode,
      phone,
      image,
    }
    executeUpdate(updatedUser);
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
        <Typography gutterBottom variant={"h3"} component="h1">User: {getResult?.data?.user.username}</Typography>
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Name" defaultValue={getResult?.data?.user.name} onChange={(e) => setName(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Surname" defaultValue={getResult?.data?.user.surname} onChange={(e) => setSurname(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Email" defaultValue={getResult?.data?.user.email} onChange={(e) => setEmail(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Phone" defaultValue={getResult?.data?.user.phone} onChange={(e) => setPhone(e.target.value)}/>
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="City" defaultValue={getResult?.data?.user.city} onChange={(e) => setCity(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Street & No." defaultValue={getResult?.data?.user.street} onChange={(e) => setStreet(e.target.value)} />
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Zip code" defaultValue={getResult?.data?.user.zipCode} onChange={(e) => setZipCode(e.target.value)}/>
        <TextField required sx={{my: 2}} fullWidth variant="outlined" label="Description" defaultValue={getResult?.data?.user.description} multiline minRows={2} onChange={(e) => setDescription(e.target.value)}/>
        <MuiFileInput sx={{my: 2}} fullWidth variant="outlined" label={"Image"} value={image} onChange={handleImageChange} placeholder={getResult?.data?.user.image} inputProps={{ accept: "image/*"}} />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" type={"submit"}>Save changes</Button>
        </Box>
      </form>
    </Box>
  );
}

export default UserProfilePage;