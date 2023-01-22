import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../api/hooks/useAuth";
import {useLoginUser, useRegisterUser} from "../api/useUser";
import {useEffect, useState} from "react";

export default function UserAccessPage() {
  const [loginResult, loginLoaded, loginError, executeLogin] = useLoginUser();
  const [registerResult, registerLoaded, registerError, executeRegister] = useRegisterUser();
  const [logMsg, setLogMsg] = useState({})
  const [regMsg, setRegMsg] = useState({})

  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (registerResult?.status === 200 && registerResult?.data) {
      setRegMsg({
        color: 'green',
        text: 'Registration successful. Please login.'
      })
    }
  }, [registerResult])

  useEffect(() => {
    console.log(loginResult)
    if (loginResult?.status === 200) {
      setAuth({user: loginResult?.data});
      navigate(from, {replace: true})
    }
  }, [loginResult])

  const handleLogin = (logUser) => {
    executeLogin(logUser)
      .catch((e) => {
        const text = e?.response?.data?.message;
        if (text) setLogMsg({color: "red", text })
        else setLogMsg({color: "red", text: "Unexpected error occurred."})
      })
  };

  const handleRegister = (newUser) => {
    executeRegister(newUser)
      .catch((e) => {
        const text = e?.response?.data?.message;
        if (text) setLogMsg({color: "red", text })
        else setLogMsg({color: "red", text: "Unexpected error occurred."})
      })
  };

  if (auth?.user) {
    return <Navigate to={location.state?.from?.pathname} state={{from: location}} replace />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <LoginForm handleLogin={handleLogin} message={logMsg}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <RegisterForm handleRegister={handleRegister} message={regMsg}/>
      </Grid>
    </Grid>
  )
}
