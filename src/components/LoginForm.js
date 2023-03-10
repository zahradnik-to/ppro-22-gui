import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object,
};

export default function LoginForm({handleLogin, message}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const logUser = {
      username,
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
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Typography variant={'h6'} component={'span'} color={message.color}>{message.text}</Typography>
        </Stack>
      </form>
    </Box>
  )
}