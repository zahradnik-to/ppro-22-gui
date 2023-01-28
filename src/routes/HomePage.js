import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import Typography from "@mui/material/Typography";
import {Divider, LinearProgress} from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {useListEvents} from "../api/useEvent";
import {useEffect, useState} from "react";
import useAuth from "../api/hooks/useAuth";

function HomePage() {
  const navigate = useNavigate();
  const {auth} = useAuth();
  const [getEventsResult, getEventsLoaded, getEventsError] = useListEvents({search: ""});

  const [events, setEvents] = useState()

  useEffect(()=> {
    if (getEventsResult?.status === 200) {
      const foundEvents = getEventsResult?.data;
      foundEvents.sort(() => Math.random() - 0.5);
      setEvents(foundEvents.slice(0,3))
    }
  }, [getEventsResult])

  const redirectRegister = async () => {
    if(!auth?.user) navigate("/userAccess");
  };

  const redirectLogin = async () => {
    if(!auth?.user) navigate("/userAccess");
  };

  const redirectToCatalog = async () => {
    navigate("/catalog");
  };

  if (!events) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <>
      <Box my={2} component={"div"}>
        <Typography variant="h4" component="h1">
          Welcome to the PPROMAT website!
        </Typography>
      </Box>
      <Divider variant="middle"/>
      <Box my={2}>
        <Typography gutterBottom variant="h5" component="h2">
          Featured events
        </Typography>
        <Grid container spacing={{xs: 2, md: 3}}>
          {events.map((event) => (
            <Grid item xs={6} sm={4} md={4} key={"hp-"+event.id}>
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
      <Divider variant="middle"/>
      <Box my={2}>
        <Typography gutterBottom variant="h5" component="h2">
          Start using PPROMAT now!
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box component={'div'}>
                <IconButton
                  alt='sign up icon'
                  sx={{ width: 180, height: 180, border: '2px solid', borderColor: 'primary.main'}}
                  color='secondary'
                  onClick={() => redirectRegister()}
                >
                  <PersonAddAlt1Icon sx={{fontSize: '112px'}}/>
                </IconButton>
              </Box>
              <Box component={'div'}>
                <Typography mt={2} variant='h6' component={'div'}>
                  Register!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box component={'div'}>
                <IconButton
                  alt='log in icon'
                  sx={{ width: 180, height: 180, border: '2px solid', borderColor: 'primary.main'}}
                  color='secondary'
                  onClick={() => redirectLogin()}
                >
                  <LoginIcon sx={{fontSize: '112px'}}/>
                </IconButton>
              </Box>
              <Box component={'div'}>
                <Typography mt={2} variant='h6' component={'div'}>
                  Log in!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box component={'div'}>
                <IconButton
                  alt='catalog icon'
                  sx={{ width: 180, height: 180, border: '2px solid', borderColor: 'primary.main'}}
                  color='secondary'
                  onClick={() => redirectToCatalog()}
                >
                  <ManageSearchIcon sx={{fontSize: '112px'}}/>
                </IconButton>
              </Box>
              <Box component={'div'}>
                <Typography mt={2} variant='h6' component={'div'}>
                  Browse events!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;