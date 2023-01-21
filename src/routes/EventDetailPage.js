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
import {useGetEvent} from "../api/useEvent";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import { StyledTableRow, StyledTableCell } from '../components/StyledTable';
import {getMockEvent} from "../mock/mock-helper";


export default function EventDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  let [event, loaded, error] = useGetEvent({id: id}, getMockEvent());

  const handleBuyVariant = (id) => {
    console.log(`Trying to buy id: ${id}`)
    const data = {
      user: "userId",
      id, // bought package id
    }
    // Todo call buy variant hook with data
  }

  const handleEditEvent = () => {
    navigate(`edit`)
  }

  const handleEditVariants = () => {
    navigate(`editVariants`)
  }

  const handleDeleteEvent = () => {
    console.log("Delete")
    // Todo open confirmation modal
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
                    <EuroSymbolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`From 2599€`} />
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
            { (true) &&
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
            }
          </Grid>
        </Grid>
      </Box><Divider/>
      <Box my={2}>
        <Box>
          <Typography gutterBottom variant='h4' component='h2'>Available variants
            {/* TODO Check if owner or admin */}
            {(true) &&
              <Button
                variant="outlined"
                startIcon={<BuildIcon />}
                onClick={() => handleEditVariants()}
                sx={{marginLeft: "1em"}}
              >
                Manage variants
              </Button>
            }
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Start</StyledTableCell>
                <StyledTableCell>End</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.offeredPackages.map((pcg) => (
                <StyledTableRow key={pcg.id}>
                  <StyledTableCell component="th" scope="row">{`${format(new Date(pcg.startDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{`${format(new Date(pcg.endDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{`${pcg.price}€`}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined" startIcon={<ShoppingBasketIcon />} onClick={() => handleBuyVariant(pcg.id)}>
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