import {Box, LinearProgress, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../components/StyledTable";
import {format} from "date-fns";
import useAuth from "../api/hooks/useAuth";
import {useGetMyOrders} from "../api/useUser";
import React from "react";
import {Link} from "react-router-dom";

function UserMyOrdersPage() {
  const {auth} = useAuth()
  const [getResult, getLoaded, error] = useGetMyOrders({username: auth?.user?.username});

  if (!getLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const myOrders = getResult?.data?.orderedEvents;

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="h1">My orders</Typography>
      <TableContainer>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event</StyledTableCell>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  <Typography sx={{textDecoration: 'underline', color: 'primary.dark'}} component={Link}
                              to={`/event/${order.id}`} gutterBottom>
                    {order.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell component="th"
                                 scope="row">{`${format(new Date(order.startDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                <StyledTableCell component="th"
                                 scope="row">{`${format(new Date(order.endDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{`${order.price}€`}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserMyOrdersPage;