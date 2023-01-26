import {Button, Checkbox, FormControlLabel, FormGroup, LinearProgress} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../components/StyledTable";
import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

AdminUserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
};

export default function AdminUserListRow({user, deleteUser, changeRole}) {
  const handleChange = (event) => {
    const checkboxValue = event.target.checked;
    const role = checkboxValue ? "SELLER" : "USER";
    changeRole(user.id, role)
  };

  if (!user) {
    return <LinearProgress color="secondary"/>
  }

  // Please refactor these checks. I'm sorry.
  const shouldBeChecked = user?.roles.some(role => role.name === "SELLER") || user?.roles.some(role => role === "SELLER");
  const isAdmin = user?.roles.some(role => role.name === "ADMIN") || user?.roles.some(role => role === "ADMIN");

  return (
    <StyledTableRow key={user.id}>
      <StyledTableCell component="th" scope="row">{user?.name} {user.surname}</StyledTableCell>
      <StyledTableCell component="th" scope="row">{user?.email}</StyledTableCell>
      <StyledTableCell component="th" scope="row">{user?.username}</StyledTableCell>
      <StyledTableCell component="th" scope="row" sx={{textAlign: "center"}}>
        { !isAdmin &&
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={shouldBeChecked} onClick={handleChange}/>}
              label="Seller"/>
          </FormGroup>
        }
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" sx={{textAlign: "right"}}>
        { !isAdmin &&
          <Button
            color={"error"}
            variant="outlined"
            startIcon={<DeleteIcon/>}
            onClick={() => deleteUser(user?.id)}
          >
            Delete
          </Button>
        }
      </StyledTableCell>
    </StyledTableRow>
  );
}