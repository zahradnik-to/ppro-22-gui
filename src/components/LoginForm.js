import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default function LoginForm({handleLogin, errorMessage}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const logUser = {
      username: email, // TODO login with username or email?
      password,
    }
    handleLogin(logUser)
  }

  return(
    <Box
      autoComplete="off"
      noValidate
      mx={5}
      mb={5}
    >
      <Typography gutterBottom variant={"h3"} component="h1">Log In</Typography>
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
            inputProps={{
              type: 'password',
              required: true
            }}
            required
          />
          <Button variant="contained" type="submit">Log In</Button>
          <Typography color={"red"}>{errorMessage}</Typography>
        </Stack>
      </form>
    </Box>
  )
}