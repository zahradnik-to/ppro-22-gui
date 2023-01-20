import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../api/hooks/useAuth";
import {useLoginUser, useUpdateUserInfo} from "../api/useUser";
import {useEffect, useState} from "react";

export default function UserAccessPage() {
  const [loginResult, loginLoaded, loginError, executeLogin] = useLoginUser();
  const [registerResult, registerLoaded, registerError, executeRegister] = useUpdateUserInfo();
  const [logErrMsg, setLogErrMsg] = useState("")
  const [regErrMsg, setRegErrMsg] = useState("")

  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (loginResult.status === 200) {
      setAuth({user: loginResult.data});
      navigate(from, {replace: true})
    }
  }, [loginResult])

  if (auth?.user) {
    navigate(from, {replace: true})
  }

  const handleLogin = (logUser) => {
    executeLogin(logUser)
      .catch((e) => {
        const message = e?.response?.data?.message;
        if (message) setLogErrMsg(message)
        else setLogErrMsg("Unexpected error occurred.")
      })
  };

  const handleRegister = (newUser) => {
    executeRegister(newUser)
      .catch((e) => {
        const message = e?.response?.data;
        if (message) setRegErrMsg(message)
        else setRegErrMsg("Unexpected error occurred.")
      })
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <LoginForm handleLogin={handleLogin} errorMessage={logErrMsg}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <RegisterForm handleRegister={handleRegister} errorMessage={regErrMsg}/>
      </Grid>
    </Grid>
  )
}
