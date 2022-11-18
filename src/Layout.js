import React from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

function Layout() {
  return(
    <>
      <ResponsiveAppBar/>
      <Container>
        <Outlet />
      </Container>
    </>
  )

}

export default Layout;