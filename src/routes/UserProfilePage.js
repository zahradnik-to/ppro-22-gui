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
  Typography
} from "@mui/material";
import {useGetEventsOfSeller, useListEvents} from "../api/useEvent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import {useGetUser} from "../api/useUser";
import EventCard from "../components/EventCard";
import ErrorPage from "./ErrorPage";
import useAuth from "../api/hooks/useAuth";


export default function UserProfilePage() {
  const { auth } = useAuth();
  const { username } = useParams();
  const [getUserResult, getUserLoaded, getUserError] = useGetUser({ username });
  const [getEventsResult, getEventsLoaded, getEventsError] = useGetEventsOfSeller({ username });
  const navigate = useNavigate();

  if (!getUserLoaded || !getEventsLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const user = getUserResult?.data;
  if (Object.keys(user).length === 0){
    return <ErrorPage errStatus={404} errMessage={"Requested page does not exist 😭"} />
  }

  const hasRole = auth?.user?.role?.some(role => ["SELLER", "ADMIN"].includes(role));
  const hasRole2 = user?.role?.some(role => ["SELLER"].includes(role));
  const isOwner = auth?.user?.id === user?.id;


  return (
    <>
      <Box my={2}>
        <Typography gutterBottom variant='h4' component='h1'>{getUserResult?.data?.username} profile</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <img
              alt={"avatar"}
              src={`data:image/*;base64,${getUserResult?.data?.image?.data}`}
              height={"100%"}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${getUserResult?.data?.name} ${getUserResult?.data?.surname}`}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <AlternateEmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.phone || "TODO PHONE"}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <InfoIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.description} />
              </ListItem>
            </List>
            {(auth?.user?.username === username) &&
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate("/event/create")}
                sx={{marginLeft: "1em", float: 'right'}}
              >
                Edit profile
              </Button>
            }
          </Grid>
        </Grid>
      </Box>
      { user?.role?.some(role => role === "SELLER") &&
        <>
          <Divider/>
          <Box my={2}>
            <Box>
              <Typography gutterBottom variant='h4' component='h2'>Offered events
                {auth?.user?.role?.find(role => role === "SELLER") && (auth?.user?.username === username) &&
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate("/event/create")}
                    sx={{marginLeft: "1em", float: 'right'}}
                  >
                    Add new Event
                  </Button>
                }
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {getEventsResult?.data.map((event) => (
                <Grid item xs={2} sm={4} md={4} key={event.id}>
                  <EventCard
                    id={event.id}
                    name={event.name}
                    description={event.shortDescription}
                    image={`data:image/*;base64,${event?.images?.data}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      }
    </>
  );
}