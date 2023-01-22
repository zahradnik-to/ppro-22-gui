import React, {useEffect} from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import {BASE_URL} from "./api/apiConstants";
import useAuth from "./api/hooks/useAuth";

function Layout() {
  const {setAuth} = useAuth();

  useEffect( () => {
    async function getAuth(){
      let result;
      let user = null;
      try {
        result = await axios.post("/authenticate", {}, {withCredentials: true, baseURL: BASE_URL});
        user = result?.data || null
      } catch (e) {

      }
      setAuth({ user })
    }
    getAuth();
  }, []);

  return(
    <>
      <ResponsiveAppBar/>
      <Box my={2}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  )

}

export default Layout;