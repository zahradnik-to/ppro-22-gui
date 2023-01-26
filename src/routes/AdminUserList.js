import {Box, LinearProgress, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {StyledTableCell} from "../components/StyledTable";
import {useDeleteUser, useListUsers, useUpdateRole} from "../api/useUser";
import React, {useEffect, useState} from "react";
import AdminUserListRow from "./AdminUserListRow";

export default function AdminUserList() {
  const [getResult, getLoaded, error] = useListUsers();
  const [users, setUsers] = useState([]);

  const [deleteResult, _deleteLoaded, _deleteError, executeDelete] = useDeleteUser();
  const [updateResult, _updateLoaded, _updateError, executeUpdate] = useUpdateRole();

  useEffect(()=>{
    if (getResult?.status === 200) {
      setUsers(getResult?.data);
    }
  },[getResult])

  useEffect(()=>{
    if (updateResult?.status === 200) {
      const updatedUser = updateResult.data
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    }
  },[updateResult])

  useEffect(()=>{
    if (deleteResult?.status === 200) {
      setUsers(removeObjectFromArray(users, deleteResult?.data?.deletedId))
    }
  },[deleteResult])

  const handleDeleteUser = (userId) => {
    executeDelete(null, {userId})
  }

  const handleChangeRole = (userId, role) => {
    executeUpdate(null, {userId, role})
  }

  const removeObjectFromArray = (arr, userId) => {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === userId);
    if (objWithIdIndex > -1) {
      arrCopy.splice(objWithIdIndex, 1);
    }
    return arrCopy;
  }

  if (!getLoaded && users) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="h1">Users</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell sx={{textAlign: "center"}}>Role</StyledTableCell>
              <StyledTableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <AdminUserListRow key={user.id} user={user} changeRole={handleChangeRole} deleteUser={handleDeleteUser}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}