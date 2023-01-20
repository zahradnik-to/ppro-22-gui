import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";

export default function AlertCustom() {
  const [message, setMessage] = useState("Something happened!");
  const [severity, setSeverity] = useState("success");
  const [display, setDisplay] = useState("none");

  const css = {position: "fixed", top: "90%", left: "50%", zIndex: "999", translate: "-50% 0", display: disply}

  return(
    <Box sx={css}>
      <Alert severity={severity}>{message}</Alert>
    </Box>
  )
}