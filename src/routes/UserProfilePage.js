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
import {useListEvents} from "../api/useEvent";
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
  const [getUserResult, getUserLoaded, getUserError] = useGetUser({ username } );
  const [getEventsResult, getEventsLoaded, getEventsError] = useListEvents({ username } );
  const navigate = useNavigate();

  if (!getUserLoaded || !getEventsLoaded) {
    return <LinearProgress color="secondary"/>
  }

  const foundUser = getUserResult?.data?.user;
  if (foundUser){
    return <ErrorPage errStatus={404} errMessage={"Requested page does not exist 😭"} />
  }

  const hasRole = auth?.user?.role?.some(role => ["SELLER", "ADMIN"].includes(role));
  const hasRole2 = foundUser?.role?.some(role => ["SELLER"].includes(role));
  const isOwner = auth?.user.id === foundUser.id;

  console.log({hasRole,
    hasRole2,
    isOwner,})

  return (
    <>
      <Box my={2}>
        <Typography gutterBottom variant='h4' component='h1'>{getUserResult?.data?.user.username} profile</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <img
              src={`data:image/*;base64,${getUserResult?.data?.user.image?.data}`}
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
                <ListItemText primary={`${getUserResult?.data?.user.name} ${getUserResult?.data?.user.surname}`}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <AlternateEmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.user.email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.user.phone || "TODO PHONE"}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                    <InfoIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getUserResult?.data?.user.description} />
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
      { foundUser?.role?.some(role => role === "SELLER") &&
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
              {Array.from(Array(8)).map((_, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <EventCard
                    id={`${index}`}
                    name={`Event ${index}`}
                    description={"Integer a imperdiet sapien. Ut congue mauris vel nisi mattis, sed dignissim. Nunc magna nisl, rhoncus a tincidunt, interdum et libero."}
                    image={"https://picsum.photos/370/180"}
                    price={Math.floor(Math.random()*2500 + 150)}
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