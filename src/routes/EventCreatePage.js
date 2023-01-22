import {useParams} from "react-router-dom";
import {useCreateEvent, useGetEvent, useUpdateEvent} from "../api/useEvent";
import {Box, Button, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useEffect, useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enGb from "date-fns/locale/en-GB";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {isEqual, isPast, startOfMinute} from "date-fns";
import {LocalizationProvider} from "@mui/x-date-pickers";
import useAuth from "../api/hooks/useAuth";

export default function EventCreatePage() {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState({});

  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberMax, setNumberMax] = useState("");

  const [createResult, _, createError, executeCreate] = useCreateEvent();

  useEffect(() => {
    if (createResult?.status === 200) {
      setMessage({color: "green", text: "Event successfully created."})
    }
    console.log(createResult)
  }, [createResult])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!image) {
      setMessage({color: "red", text: "Please select image."})
      return
    }

    const createdEvent = {
      ownerId: auth?.user?.id,
      name,
      shortDescription,
      description,
      image,
      price,
      startDate,
      endDate,
      numberMax,
    }
    console.log(createdEvent)
    executeCreate(createdEvent);
  }

  const handleImageChange = (newImage) => {
    setImage(newImage);
  }

  // Disable past dates except the default one, to prevent error when displaying past dates
  const checkInvalidDates = (newDate, defaultDate) => {
    const isNewDateSameAsDefault = isEqual(new Date(newDate), new Date(defaultDate));
    if (isNewDateSameAsDefault) return false;
    else return isPast(newDate);
  }

  return (
    <Box
      autoComplete="off"
      noValidate
      mx={2}
    >
      <form onSubmit={handleSubmit}>
        <Typography gutterBottom variant={"h3"} component="h1">Create event</Typography>
        <Stack spacing={1}>
          <TextField
            required
            fullWidth
            label="Name"
            defaultValue={null}
            onChange={(e) => setName(e.target.value)}
          />
          <MuiFileInput
            label={"Image"}
            value={image}
            onChange={handleImageChange}
            placeholder={null}
            inputProps={{accept: "image/*"}}
          />
          <TextField
            required
            fullWidth
            label="Short description"
            defaultValue={""}
            multiline
            minRows={1}
            onChange={(e) => setShortDescription(e.target.value)}
            inputProps={{
              maxLength: 140,
            }}
          />
          <TextField
            required
            fullWidth
            label="Description"
            defaultValue={""}
            multiline
            minRows={3}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Typography variant={"h5"} component={"h2"}>Initial variant</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
            <DateTimePicker
              ampm={false}
              minutesStep={15}
              inputProps={{readOnly: true}}
              label="Start date"
              value={startDate}
              onChange={setStartDate}
              shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
              renderInput={(props) => <TextField required {...props} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGb}>
            <DateTimePicker
              ampm={false}
              minutesStep={15}
              label="End date"
              value={endDate}
              inputProps={{readOnly: true}}
              onChange={setEndDate}
              shouldDisableDate={(date) => checkInvalidDates(startOfMinute(date), startOfMinute(new Date()))}
              renderInput={(props) => <TextField required {...props} />}
            />
          </LocalizationProvider>

          <TextField
            required
            fullWidth
            placeholder={"Price"}
            value={price}
            type="number"
            inputProps={{min: 1}}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            required
            fullWidth
            placeholder={"Available capacity"}
            value={numberMax}
            type="number"
            inputProps={{min: 1}}
            onChange={(e) => setNumberMax(e.target.value)}
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained" type={"submit"}>Submit!</Button>
          </Box>
          <Typography color={message?.color}>{message?.text}</Typography>
        </Stack>
      </form>
    </Box>
  );
}
