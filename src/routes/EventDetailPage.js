import {useNavigate, useParams} from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useCancelEvent, useGetEvent} from "../api/useEvent";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import {format} from 'date-fns'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import {StyledTableCell, StyledTableRow} from '../components/StyledTable';
import useAuth from "../api/hooks/useAuth";
import {useOrderVariant} from "../api/useVariant";
import React, {useEffect, useState} from "react";


export default function EventDetailPage() {
  const {auth} = useAuth();
  const {eventId} = useParams();
  const navigate = useNavigate();

  const [event, eventLoaded, error] = useGetEvent({eventId});
  const [cancelResult, cancelLoaded, cancelError, executeCancel] = useCancelEvent();
  const [orderResult, orderLoaded, orderError, executeOrder] = useOrderVariant();

  const [variants, setVariants] = useState([]);
  const [message, setMessage] = useState("");
  const [eventState, setEventState] = useState("true");

  useEffect(()=> {
    setVariants(event?.data?.variants)
    setEventState(event?.data?.state)
  }, [eventLoaded])


  useEffect(()=> {
    if (orderResult?.status === 200) {
      const ordered = orderResult?.data
      setVariants(variants.map(v => v.id === ordered.id ? ordered : v))
    }
  }, [orderResult])

  useEffect(()=> {
    if (cancelResult?.status === 200) {
      setMessage("Event has been successfully cancelled.")
      setEventState("CANCELLED");
      setVariants([])
    }
  }, [cancelResult])

  const handleOrderVariant = (variantId) => {
    executeOrder(null, {variantId, eventId})
  }

  const handleCancelEvent = () => {
    executeCancel(null, {eventId, userId: auth?.user?.id,})
  }

  if (!eventLoaded || !variants) {
    return <LinearProgress color="secondary"/>
  }

  const isActive = eventState === "CREATED";
  const isCancelled = eventState === "CANCELLED";

  return (
    <>
      <Box my={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} sx={{filter: isActive ? "none" : "grayscale(100%)", transitionDuration: '500ms'}}>
            <img
              src={`data:image/*;base64,${event?.data?.images?.data}`}
              height={"100%"}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography gutterBottom variant='h3' component='h1'>{event.data.name}</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event?.contact?.name || "TODO OWNER USERNAME"}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <EuroSymbolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event?.data?.variants.length !==0 ? `From ${event?.data?.variants.reduce((a, b) => a.price < b.price ? a : b).price}€` : "Sorry, no variants available."} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <ArticleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.data.shortDescription}/>
              </ListItem>
            </List>
            { auth?.user && (event.data.ownerId === auth?.user?.id) &&
              <Box textAlign="center">
                { !isCancelled &&
                  <Button
                    variant="outlined"
                    startIcon={<ModeEditIcon />}
                    onClick={() => navigate(`edit`)}
                    sx={{marginRight: "1em"}}
                  >
                    Edit
                  </Button>
                }
                <Button
                  color={"error"}
                  disabled={isCancelled}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleCancelEvent()}
                >
                  {isCancelled ? 'Event is cancelled' : 'Cancel event'}
                </Button>
                <Typography color="green">{message}</Typography>
              </Box>
            }
          </Grid>
        </Grid>
      </Box><Divider/>
      <Box my={2}>
        <Box>
          <Typography gutterBottom variant='h4' component='h2'>Available variants
            { auth?.user && (event.data.ownerId === auth?.user?.id) &&
              <Button
                variant="outlined"
                startIcon={<BuildIcon />}
                onClick={() => navigate(`editVariants`)}
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
                <StyledTableCell>Availability</StyledTableCell>
                {auth?.user &&
                  <StyledTableCell align="right"></StyledTableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {variants?.length !== 0 ?
                variants.sort((a,b) => Date.parse(new Date(a.startDate)) - Date.parse(new Date(b.startDate))).map((variant) => (
                <StyledTableRow key={variant.id}>
                  <StyledTableCell component="th" scope="row">{`${format(new Date(variant.startDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{`${format(new Date(variant.endDate), 'dd.MM.yyy hh:mm')}`}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{`${variant.price}€`}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{`${variant.numberAvailable}/${variant.numberMax}`}</StyledTableCell>
                  {auth?.user &&
                    <StyledTableCell align="right">
                      <Button variant="outlined" startIcon={<ShoppingBasketIcon />} onClick={() => handleOrderVariant(variant.id)}>
                        Order
                      </Button>
                    </StyledTableCell>
                  }
                </StyledTableRow>
              ))
              :
                <StyledTableRow>
                  <StyledTableCell>No variants.</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
                  }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider/>
      <Box my={2}>
        <Typography gutterBottom variant='h4' component='h2'>Description</Typography>
        <Typography sx={{whiteSpace: 'pre-line'}} variant='body1'>{event.data.description}</Typography>
      </Box>
    </>
  );
}