import {
  Box,
  Button,
  Collapse,
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {format} from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";
import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";

VariantUpdateTableRow.propTypes = {
  variant: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  eventState: PropTypes.string,
};

VariantUpdateTableRow.defaultProps = {
  eventState: "CREATED",
};

export default function VariantUpdateTableRow({variant, cancel, eventState}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!variant) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th"
                         scope="row">{format(new Date(variant.startDate), 'dd.MM.yyy hh:mm')}</StyledTableCell>
        <StyledTableCell component="th"
                         scope="row">{format(new Date(variant.endDate), 'dd.MM.yyy hh:mm')}</StyledTableCell>
        <StyledTableCell component="th" scope="row">{variant.price}</StyledTableCell>
        <StyledTableCell component="th"
                         scope="row">{`${variant.numberAvailable}/${variant.numberMax}`}</StyledTableCell>
        <StyledTableCell align="right">
            {variant.state === "CREATED" &&
              <Button
                color={"error"}
                variant="outlined"
                startIcon={<DeleteIcon/>}
                onClick={() => cancel(variant.id)}
              >
                Cancel
              </Button>
            }
            {variant.state === "CANCELLED" &&
              <Button
                disabled
                color={"error"}
                variant="outlined"
              >
                Cancelled
              </Button>
            }
            {variant.state === "FINISHED" &&
              <Button
                disabled
                color={"success"}
                variant="outlined"
              >
                Finished
              </Button>
            }
        </StyledTableCell>
        <StyledTableCell>
          {variant?.buyers?.length !== 0 &&
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          }
        </StyledTableCell>
      </StyledTableRow>
      <TableRow
        sx={{'& > *': {borderBottom: 'unset'}, borderLeft: '1px lightgrey solid', borderRight: '1px lightgrey solid'}}>
        {variant?.buyers?.length !== 0 &&
          <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{margin: 1}}>
                <Typography variant={"h6"}>Buyers</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell align="right">Profile</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {variant?.buyers.map((buyer, index) => (
                        <StyledTableRow key={`${variant.id}-${buyer.username}-${index}`}>
                          <TableCell>{`${buyer.name} ${buyer.surname}`}</TableCell>
                          <TableCell>{buyer.email}</TableCell>
                          <TableCell>{buyer.phone}</TableCell>
                          <TableCell align="right">
                            <Button
                              color={"info"}
                              variant="outlined"
                              startIcon={<AccountCircleIcon/>}
                              onClick={() => navigate(`/user/${buyer.username}`)}
                            >
                              Profile
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </TableCell>
        }
      </TableRow>
    </>
  )
}
