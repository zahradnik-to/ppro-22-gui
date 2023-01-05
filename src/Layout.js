import React from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

function Layout() {
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