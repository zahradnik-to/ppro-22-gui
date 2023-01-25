import {Button, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enGb from "date-fns/locale/en-GB";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {isEqual, isPast, startOfMinute} from "date-fns";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {useAddVariant} from "../api/useVariant";
import React, {useEffect, useState} from "react";
import VariantUpdateTableRow from "./VariantUpdateTableRow";
import useAuth from "../api/hooks/useAuth";

VariantUpdateTable.propTypes = {
  variants: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
  setVariants: PropTypes.func.isRequired,
};

export default function VariantUpdateTable({variants, eventId, setVariants}) {
  const {auth} = useAuth()
  const [createResult, createLoaded, createError, executeCreate] = useAddVariant();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState("");
  const [numberMax, setNumberMax] = useState("");

  useEffect(() => {
    if (!createLoaded) return
    // setVariants([...variants, createResult])
    // resetNewVariantFields();
  }, [createResult])

  useEffect(() => {
    if (createError) {
      console.error("ERROR OCCURRED IN COMPONENT", {createError})
    }
  }, [createError])

  const removeObjectFromArray = (arr, variantId) => {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === variantId);
    if (objWithIdIndex > -1) {
      arrCopy.splice(objWithIdIndex, 1);
    }
    return arrCopy;
  }

  const resetNewVariantFields = () => {
    setStartDate("");
    setEndDate("");
    setPrice("");
  }

  const handleAddVariant = (e) => {
    e.preventDefault()
    const newVariant = {
      sellerId: auth.user.id,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      eventId,
      price,
      numberMax,
    }
    executeCreate(newVariant)
  }

  // Disable past dates except the default one, to prevent error when displaying past dates
  const checkInvalidDates = (newDate, defaultDate) => {
    const isNewDateSameAsDefault = isEqual(new Date(newDate), new Date(defaultDate));
    if (isNewDateSameAsDefault) return false;
    else return isPast(newDate);
  }

  return (
    <form onSubmit={handleAddVariant}>
      <TableContainer>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Availability</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((variant) => (
              <VariantUpdateTableRow key={variant.id} variant={variant}/>
            ))}
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                  <DateTimePicker
                    required
                    ampm={false}
                    minutesStep={15}
                    inputProps={{readOnly: true}}
                    value={startDate}
                    onChange={setStartDate}
                    shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                    renderInput={(props) => <TextField required {...props} />}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                  <DateTimePicker
                    required
                    ampm={false}
                    minutesStep={15}
                    value={endDate}
                    inputProps={{readOnly: true}}
                    onChange={setEndDate}
                    shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                    renderInput={(props) => <TextField required {...props} />}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  placeholder={"Price"}
                  value={price}
                  type="number"
                  inputProps={{min: 1}}
                  onChange={(e) => setPrice(e.target.value)}/>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  placeholder={"Max availability"}
                  value={numberMax}
                  type="number"
                  inputProps={{min: 1}}
                  onChange={(e) => setNumberMax(e.target.value)}/>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  color={"success"}
                  variant="outlined"
                  startIcon={<AddIcon/>}
                  type={"submit"}
                >
                  Add
                </Button>
              </StyledTableCell>
              <StyledTableCell/>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  )
}