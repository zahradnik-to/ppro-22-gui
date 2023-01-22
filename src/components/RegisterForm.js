import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  message: PropTypes.object,
};

export default function RegisterForm({handleRegister, message}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      email,
      name,
      surname,
      phone,
      city,
      street,
      zipCode,
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
            inputProps={{
              minLength: 3,
              maxLength: 30,
              pattern: "\\w+"
            }}
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
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              maxLength: 50,
              pattern: "[A-z]+[\\w \\-]*",
              title: "Only A-z 0-9 _ characters allowed."
            }}
            required
          />
          <TextField
            variant="outlined"
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            inputProps={{
              maxLength: 50,
              pattern: "[A-z]+[\\w \\-]*$",
              title: "Only A-z 0-9 _ characters allowed."
            }}
            required
          />
          <TextField
            variant="outlined"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{
              type: 'tel',
              minLength: 9,
              maxLength: 9,
              pattern: "\\d{9}",
              title: "Must be in 333444555 format."
            }}
            required
          />
          <TextField
            ariant="outlined"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            inputProps={{
              maxLength: 50,
              pattern: "^[A-z]+[\\w \\-]*$",
              title: "Only A-z 0-9 _ characters allowed."
            }}
            required
          />
          <TextField
            ariant="outlined"
            label="Street & No."
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            inputProps={{
              maxLength: 50,
              pattern: "^[A-z]+[\\w \\-]*$",
              title: "Only A-z 0-9 _ characters allowed."
            }}
            required
          />
          <TextField
            ariant="outlined"
            label="Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            inputProps={{
              minLength: 5,
              maxLength: 6,
              pattern: "\\d{3} ?\\d{2}",
              title: "Must be in format 55544 or 555 44."
            }}
            required
          />
          <Button variant="contained" type={"submit"}>Register</Button>
          <Typography color={message.color}>{message.text}</Typography>
        </Stack>
      </form>
    </Box>
  )
}