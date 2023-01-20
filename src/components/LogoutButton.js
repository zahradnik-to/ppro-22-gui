import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {useLogoutUser} from "../api/useUser";
import {useEffect} from "react";
import useAuth from "../api/hooks/useAuth";
import PropTypes from "prop-types";

LogoutButton.propTypes = {
  handleCloseUserMenu: PropTypes.func,
};

export default function LogoutButton({handleCloseUserMenu}) {
  const [logoutResult, logoutLoaded, logoutError, executeLogout] = useLogoutUser();
  const {setAuth} = useAuth();

  useEffect(() => {
    console.log("Logout UE", logoutResult)
    if (logoutResult.status === 200) {
      setAuth(null);
      handleCloseUserMenu()
    }
  }, [logoutResult])


  const handleLogOut = () => {
    executeLogout()
  }

  return(
    <MenuItem onClick={handleLogOut}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  )
}