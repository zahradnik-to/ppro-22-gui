import {useNavigate, useParams} from "react-router-dom";
import {
  Avatar,
  Box, Button,
  Divider,
  Grid, LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table, TableBody, TableContainer, TableHead, TableRow,
  Typography
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {useGetEvent} from "../api/useEvent";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {getMockEvent} from '../mock/mock-helper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function EventDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  let [event, loaded, error] = useGetEvent({id: id});

  // Todo delete this after fetching real event
  event = getMockEvent();
  console.log(event)

  const handleBuyPackage = (id) => {
    console.log(`Trying to buy id: ${id}`)
    const data = {
      user: "userId",
      id, // bought package id
    }
    // Todo call buy package hook with data
  }

  const handleEditEvent = () => {
    navigate(`update`)
  }

  const handleDeleteEvent = () => {
    console.log("Delete")
  }

  if (!loaded) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <>
      <Box my={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <img
              src={event.image}
              height={"100%"}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography gutterBottom variant='h3' component='h1'>{event.name}</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.contact.name} secondary={event.contact.phoneNumber}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <CreditCardIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${event.price} Kč`} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <ArticleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.descriptionShort}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <LocationOnIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.address} />
              </ListItem>
            </List>
            {/* TODO Check if owner or admin */}
            <Box textAlign="center">
              <Button
                variant="outlined"
                startIcon={<ModeEditIcon />}
                onClick={() => handleEditEvent()}
                sx={{marginRight: "1em"}}
              >
                Edit
              </Button>
              <Button
                color={"error"}
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteEvent()}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box><Divider/>
      <Box my={2}>
        <Typography gutterBottom variant='h4' component='h2'>Available packages</Typography>
        <TableContainer>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Start</StyledTableCell>
                <StyledTableCell>End</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.offeredPackages.map((pcg) => (
                <StyledTableRow key={pcg.id}>
                  <StyledTableCell component="th" scope="row">
                    {`${format(new Date(pcg.startDate), 'dd.MM.yyy hh:mm')}`}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {`${format(new Date(pcg.endDate), 'dd.MM.yyy hh:mm')}`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined" startIcon={<ShoppingBasketIcon />} onClick={() => handleBuyPackage(pcg.id)}>
                      Buy
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      </Box>
      <Divider/>
      <Box my={2}>
        <Typography gutterBottom variant='h4' component='h2'>Description</Typography>
        <Typography sx={{whiteSpace: 'pre-line'}} variant='body1'>{event.descriptionLong}</Typography>
      </Box>
    </>
  );
}