import {Box, Button, Collapse, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enGb from "date-fns/locale/en-GB";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {format, isEqual, isPast, startOfMinute} from "date-fns";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";
import {useAddVariant, useCancelVariant} from "../api/useVariant";
import {useEffect, useState} from "react";
import React from 'react';
import TableCell from "@mui/material/TableCell";
import IconButton from '@mui/material/IconButton';

VariantUpdateTableRow.propTypes = {
  variant: PropTypes.object.isRequired,
};

export default function VariantUpdateTableRow({variant}) {
  const [open, setOpen] = useState(false);
  const [deleteResult, deleteLoaded, deleteError, executeDelete] = useCancelVariant();

  // Should react after handleDeleteVariant function completes call
  useEffect(() => {
    console.log("deleteResult",deleteResult)
  }, [deleteResult])

  const handleDeleteVariant = (variantId) => {
    console.log(variantId)
    const mockedResponse = {id: variantId}; // TODO Delete this
    // executeDelete({id: variantId}, mockedResponse);
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
            onClick={() => handleDeleteVariant(variant.id)}
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