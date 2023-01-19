import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../api/hooks/useAuth";
import {useLoginUser, useRegisterUser} from "../api/useUser";
import {useEffect} from "react";
import {getMockLoginResponse} from "../mock/mock-helper";

export default function UserAccessPage() {
  const [loginResult, loginLoaded, loginError, executeLogin] = useLoginUser();
  const [registerResult, registerLoaded, registerError, executeRegister] = useRegisterUser();
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log("Login useEffect")
    if (loginResult.status === 200) {
      setAuth({user: loginResult.user});
      navigate(from, {replace: true})
    }
  }, [loginResult])

  if (auth?.user) {
    navigate(from, {replace: true})
  }

  const handleRegister = (newUser) => {
    executeRegister(newUser)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  };

  const handleLogin = async (logUser) => {
    executeLogin(logUser)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
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
