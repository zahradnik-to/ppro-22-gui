import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default function RegisterForm({handleRegister, errorMessage}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [description, setDescription] = useState("");
  // const [city, setCity] = useState(""); // Todo delete these?
  // const [street, setStreet] = useState("");
  // const [zipCode, setZipCode] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      name,
      email,
      surname,
      description,
    }
    handleRegister(newUser)
  }

  return (
    <Box
      autoComplete="off"
      noValidate
      mx={5}
    >
      <Typography gutterBottom variant={"h3"} component="h1">Register</Typography>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={1}>
          <TextField
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            ariant="outlined"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            inputProps={{
              autoComplete: 'new-password',
              type: 'password',
            }}
          />
          <TextField
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* TODO set address in user settings ??? */}
          {/*<TextField*/}
          {/*  ariant="outlined"*/}
          {/*  label="City"*/}
          {/*  value={city}*/}
          {/*  onChange={(e) => setCity(e.target.value)}*/}
          {/*  required*/}
          {/*/>*/}
          {/*<TextField*/}
          {/*  ariant="outlined"*/}
          {/*  label="Street & No."*/}
          {/*  value={street}*/}
          {/*  onChange={(e) => setStreet(e.target.value)}*/}
          {/*  required*/}
          {/*/>*/}
          {/*<TextField*/}
          {/*  ariant="outlined"*/}
          {/*  label="Zip code"*/}
          {/*  value={zipCode}*/}
          {/*  onChange={(e) => setZipCode(e.target.value)}*/}
          {/*  required*/}
          {/*/>*/}
          <Button variant="contained" type={"submit"}>Register</Button>
          <Typography color={"red"}>{errorMessage}</Typography>
        </Stack>
      </form>
    </Box>
  )
}