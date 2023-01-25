import {Box, Button, Collapse, TableRow, Typography} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {format} from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";
import {useCancelVariant} from "../api/useVariant";
import React, {useEffect, useState} from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from '@mui/material/IconButton';
import useAuth from "../api/hooks/useAuth";

VariantUpdateTableRow.propTypes = {
  variant: PropTypes.object.isRequired,
};

export default function VariantUpdateTableRow({variant}) {
  const {auth} = useAuth()
  const [open, setOpen] = useState(false);
  const [deleteResult, deleteLoaded, deleteError, executeDelete] = useCancelVariant();

  // Should react after handleDeleteVariant function completes call
  useEffect(() => {
    console.log("deleteResult",deleteResult)

  }, [deleteResult])

  const handleCancelVariant = (variantId) => {
    executeDelete(null, {variantId, userId: auth.user.id});
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">{format(new Date(variant.startDate), 'dd.MM.yyy hh:mm')}</StyledTableCell>
        <StyledTableCell component="th" scope="row">{format(new Date(variant.endDate), 'dd.MM.yyy hh:mm')}</StyledTableCell>
        <StyledTableCell component="th" scope="row">{variant.price}</StyledTableCell>
        <StyledTableCell component="th" scope="row">{`${variant.numberAvailable}/${variant.numberMax}`}</StyledTableCell>
        <StyledTableCell align="right">
          <Button
            color={"error"}
            variant="outlined"
            startIcon={<DeleteIcon/>}
            onClick={() => handleCancelVariant(variant.id)}
          >
            Cancel
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
                Buyers: TODO
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}