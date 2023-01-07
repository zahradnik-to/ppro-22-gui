import {useParams} from "react-router-dom";
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

function getMockedEvent() {
  return {
    id: '1234abcdf1234abcfd',
    organizerId: '4567abcdf4567',
    contact: {
      name: 'John Doe Adventures, Inc.',
      phoneNumber: "+420 446 886 222"
    },
    name: 'Mocked event',
    descriptionShort: 'Short description appers here. Another amazing sentence. Awesome job everybody, keep it up.',
    descriptionLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu viverra nulla. In ultrices ullamcorper tristique. Quisque erat arcu, mattis eget massa pharetra, bibendum tristique augue. Fusce non leo in leo ultrices varius. Integer odio massa, sodales vel consectetur sit amet, finibus vitae nunc. Praesent nec orci eu erat mattis varius ut vel mauris. Integer ut dolor consectetur, finibus massa ut, vestibulum arcu. Aliquam molestie dignissim condimentum. Suspendisse ac odio at massa hendrerit interdum. Sed et ligula tempus, dignissim sem placerat, elementum elit. Vivamus molestie faucibus justo eget sollicitudin. Proin augue nisl, rutrum nec efficitur quis, viverra et sapien. Etiam sollicitudin est a felis egestas, et rutrum sem tempus. Nunc et augue purus. Cras convallis tellus sed fringilla lacinia. Suspendisse vitae neque ante.\n' +
      '\n' +
      'Proin turpis nisl, consectetur sed magna sit amet, tempus eleifend nisl. Maecenas viverra ligula lectus, in egestas tellus eleifend et. Praesent ut lectus tristique, mattis est sit amet, ornare ligula. Nam vehicula, metus et dapibus mattis, turpis lacus egestas dui, semper molestie justo lorem eu sapien. Quisque commodo ligula vel libero lobortis, sed vulputate diam eleifend. Donec lacinia a diam scelerisque ultrices. Sed condimentum purus vel neque eleifend, at mattis arcu consequat. Integer at lectus in velit semper venenatis eu at sem. Aenean ut finibus odio. Suspendisse suscipit, arcu eu commodo volutpat, felis orci sollicitudin risus, et pharetra risus nunc eu urna.\n' +
      '\n' +
      'Fusce non condimentum arcu. Nullam cursus hendrerit vehicula. Aliquam congue fermentum risus eget finibus. Fusce vulputate, ligula gravida posuere auctor, justo arcu ultricies turpis, eu tempus turpis urna vel dui. Quisque suscipit enim id mi viverra, eget congue ipsum pretium. Vestibulum sodales lobortis mauris, sed mollis elit aliquam et. Duis pretium sit amet ipsum sit amet consectetur. Donec congue tortor sed mattis laoreet. Quisque eget venenatis dolor, id accumsan risus.',
    price: 2599,
    address: 'Hradec Králové',
    image: 'https://picsum.photos/400/250',
    offeredPackages: [
      {
        id: '1fd',
        startDate: '2023-05-18T00:00:00Z',
        endDate: '2025-05-19T00:00:00Z',
      },
      {
        id: '2fd',
        startDate: '2023-08-18T00:00:00Z',
        endDate: '2025-05-19T00:00:00Z',
      },
      {
        id: '3fd',
        startDate: '2025-05-18T00:00:00Z',
        endDate: '2025-05-19T00:00:00Z',
      }
    ]
  }
}

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
  const { id } = useParams();
  let [event, loaded, error] = useGetEvent({id: id});

  // Todo delete this after fetching real event
  event = getMockedEvent();

  const handleBuyPackage = (id) => {
    console.log(`Trying to buy id: ${id}`)
    const data = {

    }
  }

  const handleEditEvent = () => {
    console.log("Edit")
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