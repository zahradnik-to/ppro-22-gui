import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default function RegisterForm({handleRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      name,
      city,
      street,
      zipCode,
    }
    handleRegister(newUser)
  }

  return(
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
            ariant="outlined"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <TextField
            ariant="outlined"
            label="Street & No."
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <TextField
            ariant="outlined"
            label="Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained" type={"submit"}>Register</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}