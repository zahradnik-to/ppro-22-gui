import {Box, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../components/StyledTable";
import {format} from "date-fns";
import {getMockOrders} from "../mock/mock-helper";

function UserMyOrdersPage() {

  const orders = getMockOrders();

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="h1">My orders</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event name</StyledTableCell>
              <StyledTableCell>Variant</StyledTableCell>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">{`Event name`}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{`Variant name`}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{`${format(new Date(order.startDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{`${format(new Date(order.endDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
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