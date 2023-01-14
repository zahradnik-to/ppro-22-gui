import {Box, Button, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enGb from "date-fns/locale/en-GB";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {isEqual, isPast, startOfMinute} from "date-fns";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {useCreateVariant, useDeleteVariant, useUpdateManyVariants} from "../api/useVariant";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {useEffect, useState} from "react";

VariantUpdateTable.propTypes = {
  variants: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
  setVariants: PropTypes.func.isRequired,
};

export default function VariantUpdateTable({variants, eventId, setVariants}) {
  const [updateResult, updateLoaded, updateError, executeUpdateMany] = useUpdateManyVariants();
  const [createResult, createLoaded, createError, executeCreate] = useCreateVariant();
  const [deleteResult, deleteLoaded, deleteError, executeDelete] = useDeleteVariant();

  const [editedData, setEditedData] = useState([]);
  const [newVarStart, setNewVarStart] = useState(null);
  const [newVarEnd, setNewVarEnd] = useState(null);
  const [newVarPrice, setNewVarPrice] = useState("");

  // Should react after handleDeleteVariant function completes call
  useEffect(() =>{
    if (deleteResult.hasOwnProperty('error') || deleteError) return;
    setVariants(removeObjectFromArray(variants, deleteResult.id));
  }, [deleteResult])

  useEffect(() =>{
    if (!createLoaded) return
    if (createResult.hasOwnProperty('error') || createError) return;
    setVariants([...variants, createResult])
    resetNewVariantFields();
  }, [createResult])

  useEffect(() =>{
    console.log({createError, updateError, deleteError})
  }, [createError, updateError, deleteError])

  const handleDateChange = (id, objProperty, value) => {
    handleEdit(id, objProperty, value)
  };

  const decideDateValue = (id, objProperty) => {
    const existingEdit = editedData.find(obj => obj.id === id)
    if (existingEdit && existingEdit[objProperty]) return existingEdit[objProperty];
    else return (variants.find(obj => obj.id === id))[objProperty]
  };

  const handleSaveAll = () => {
    executeUpdateMany(editedData);
  }

  const handleDeleteVariant = async (variantId) => {
    const mockedResponse = {id: variantId}; // TODO Delete this
    executeDelete({id: variantId}, mockedResponse);
  }

  const removeObjectFromArray = (arr, variantId) => {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === variantId);
    if (objWithIdIndex > -1) {
      arrCopy.splice(objWithIdIndex, 1);
    }
    return arrCopy;
  }

  const resetNewVariantFields = () => {
    setNewVarStart(null);
    setNewVarEnd(null);
    setNewVarPrice("");
  }

  const handleAddVariant = () => {
    const newVariant = {
      eventId,
      startDate: new Date(newVarStart).toISOString(),
      endDate: new Date(newVarStart).toISOString(),
      price: newVarPrice,
    }
    const mockedResponse = newVariant;
    executeCreate(newVariant, mockedResponse)
  }

  /* Adds edited row to array of edited objects. */
  const handleEdit = (id, objProperty, value) => {
    const propertyIsDate = (objProperty === 'startDate' || objProperty === 'endDate')
    if (propertyIsDate) value = new Date(value).toISOString()

    const newEditedData = [...editedData];
    const existingEdit = newEditedData.find(obj => obj.id === id)

    if (existingEdit) {
      existingEdit[objProperty] = value;
    } else {
      const originalObject = variants.find(obj => obj.id === id)
      const editObject = {id: originalObject.id};

      if (propertyIsDate) originalObject[objProperty] = value
      editObject[objProperty] = value;
      newEditedData.push(editObject)
    }
    setEditedData(newEditedData);
  };

  // Disable past dates except the default one, to prevent error when displaying past dates
  const checkInvalidDates = (newDate, defaultDate) => {
    const isNewDateSameAsDefault = isEqual(new Date(newDate), new Date(defaultDate));
    if (isNewDateSameAsDefault) return false;
    else return isPast(newDate);
  }

  return(
    <>
      <TableContainer>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((variant) => (
              <StyledTableRow key={variant.id}>
                <StyledTableCell component="th" scope="row">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                    <DateTimePicker
                      ampm={false}
                      minutesStep={15}
                      inputProps={{readOnly: true}}
                      value={decideDateValue(variant.id, 'startDate')}
                      onChange={(newValue) => {
                        handleDateChange(variant.id, 'startDate', newValue);
                      }}
                      shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                      renderInput={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                    <DateTimePicker
                      ampm={false}
                      minutesStep={15}
                      value={decideDateValue(variant.id, 'endDate')}
                      inputProps={{readOnly: true}}
                      onChange={(newValue) => {
                        handleDateChange(variant.id, 'endDate', newValue);
                      }}
                      shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                      renderInput={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={variant.price}
                    type="number"
                    inputProps={{min: 1}}
                    onChange={(e) => handleEdit(variant.id, 'price', e.target.value)}/>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    color={"error"}
                    variant="outlined"
                    startIcon={<DeleteIcon/>}
                    onClick={() => handleDeleteVariant(variant.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                  <DateTimePicker
                    ampm={false}
                    minutesStep={15}
                    inputProps={{readOnly: true}}
                    value={newVarStart}
                    onChange={setNewVarStart}
                    shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
                  <DateTimePicker
                    ampm={false}
                    minutesStep={15}
                    value={newVarEnd}
                    inputProps={{readOnly: true}}
                    onChange={setNewVarEnd}
                    shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={"Price"}
                  value={newVarPrice}
                  type="number"
                  inputProps={{min: 1}}
                  onChange={(e) => setNewVarPrice(e.target.value)}/>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  color={"success"}
                  variant="outlined"
                  startIcon={<AddIcon/>}
                  onClick={() => handleAddVariant()}
                >
                  Add New
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display: "flex", justifyContent: 'flex-end', marginTop: '1em'}}>
        <Button
          variant="contained"
          startIcon={<ModeEditIcon/>}
          onClick={() => handleSaveAll()}
        >
          Save all
        </Button>
      </Box>
  </>
  )
}