import useAuth from "../api/hooks/useAuth";
import {useGetUser, useUpdateUserInfo, useUpdateUserPassword} from "../api/useUser";
import {Button, Grid, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useEffect, useState} from "react";

function UserProfileEditPage() {
  const {auth} = useAuth();
  const [getResult, getLoaded, error] = useGetUser({username: auth?.user?.username});
  const [infoUpdateResult, __updateLoaded, infoUpdateError, executeInfoUpdate] = useUpdateUserInfo();
  const [pswUpdateResult, _updateLoaded, pswUpdateError, executePwsUpdate] = useUpdateUserPassword();


  const [infoErrorMessage, setInfoErrorMessage] = useState({});
  const [pswErrorMessage, setPswErrorMessage] = useState({});

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [description, setDescription] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [image, setImage] = useState(null);

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(null);

  useEffect(() => {
    if (infoUpdateResult?.status === 200) {
      setInfoErrorMessage({color: "green", text: "Information changed!"})
    }
  }, [infoUpdateResult])

  useEffect(() => {
    if (pswUpdateResult?.status === 200) {
      setPswErrorMessage({color: "green", text: "Password changed!"})
    } else if (pswUpdateError) {
      setPswErrorMessage({color: "red", text: "Something went wrong!"})
    }
  }, [pswUpdateResult])

  if (!getLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const handleUpdateInfo = (e) => {
    e.preventDefault()
    const userUpdate = {
      id: auth.user.id,
      email: email || getResult?.data?.email,
      name: name || getResult?.data?.name,
      surname: surname || getResult?.data?.surname,
      description: description || getResult?.data?.description,
      city: city || getResult?.data?.city,
      street: street || getResult?.data?.street,
      zipCode: zipCode || getResult?.data?.zipCode,
      phone: phone || getResult?.data?.phone,
      image: image || null,
    }
    executeInfoUpdate(userUpdate)
    .catch((e) => {
      const text = e?.response?.data?.message;
      if (text) setInfoErrorMessage({color: "red", text })
      else setInfoErrorMessage({color: "red", text: "Unexpected error occurred."})
    })
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    const passwordUpdate = {
      id: auth.user.id,
      oldPassword,
      newPassword,
      newPasswordConfirmation,
    }
    executePwsUpdate(passwordUpdate)
    .catch((e) => {
      const text = e?.response?.data?.message;
      if (text) setPswErrorMessage({color: "red", text })
      else setPswErrorMessage({color: "red", text: "Unexpected error occurred."})
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleUpdateInfo}>
          <Typography gutterBottom variant={"h3"} component="h1">User: {getResult?.data?.username}</Typography>
          <Stack spacing={1}>
            <TextField required fullWidth label="Name" defaultValue={getResult?.data?.name}
                       onChange={(e) => setName(e.target.value)}/>
            <TextField required fullWidth label="Surname" defaultValue={getResult?.data?.surname}
                       onChange={(e) => setSurname(e.target.value)}/>
            <TextField required fullWidth label="Email" defaultValue={getResult?.data?.email}
                       onChange={(e) => setEmail(e.target.value)}/>
            <TextField required fullWidth label="Phone" defaultValue={getResult?.data?.phone}
                       onChange={(e) => setPhone(e.target.value)}/>
            <TextField required fullWidth label="City" defaultValue={getResult?.data?.city}
                       onChange={(e) => setCity(e.target.value)}/>
            <TextField required fullWidth label="Street & No." defaultValue={getResult?.data?.street}
                       onChange={(e) => setStreet(e.target.value)}/>
            <TextField required fullWidth label="Zip code" defaultValue={getResult?.data?.zipCode}
                       onChange={(e) => setZipCode(e.target.value)}/>
            <TextField fullWidth label="Description" defaultValue={getResult?.data?.description}
                       multiline minRows={2} onChange={(e) => setDescription(e.target.value)}/>
            <MuiFileInput variant="outlined" label={"New Image"} value={image}
                          onChange={handleImageChange} inputProps={{accept: "image/*", sx: {width: '100%'}}}/>
            <Button variant="contained" type={"submit"}>Change info</Button>
            <Typography color={infoErrorMessage.color}>{infoErrorMessage.text}</Typography>
          </Stack>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleUpdatePassword}>
          <Typography gutterBottom variant={"h3"} component="h1">Update password</Typography>
          <Stack spacing={1}>
            <TextField required fullWidth label="Password" defaultValue={""}
                       onChange={(e) => setOldPassword(e.target.value)}
                       inputProps={{type: 'password',}}/>
            <TextField required fullWidth label="New password" defaultValue={""}
                       onChange={(e) => setNewPassword(e.target.value)}
                       inputProps={{autoComplete: 'new-password', type: 'password',}}/>
            <TextField required fullWidth label="New password confirmation" defaultValue={""}
                       onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                       inputProps={{autoComplete: 'new-password', type: 'password',}}/>
            <Button variant="contained" type={"submit"}>Change password</Button>
            <Typography color={pswErrorMessage.color}>{pswErrorMessage.text}</Typography>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}

export default UserProfileEditPage;