import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../api/hooks/useAuth";
import {useLoginUser} from "../api/useUser";
import {useEffect} from "react";

export default function UserAccessPage() {
  const [loginResult, loginLoaded, loginError, executeLogin] = useLoginUser();
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log("UE loginResult")
    if (loginResult.status === 200) {
      setAuth(loginResult.user);

      navigate(from, {replace: true})
    }
  }, [loginResult])

  if (auth?.user) {
    navigate(from, {replace: true})
  }

  const handleRegister = (newUser) => {
    console.log("Register: ", newUser)
  };

  const handleLogin = (logUser) => {
    const mockedUser = {
      status: 200,
      user: {
        ...logUser,
        name: "Mock Mockignton",
        roles: ["admin"]
      },
      accessToken: "asdf1234"
    }
    executeLogin(logUser, mockedUser);
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <LoginForm handleLogin={handleLogin}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <RegisterForm handleRegister={handleRegister}/>
      </Grid>
    </Grid>
  )
}
