import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const redirectToSignUp = async () => {
    navigate("/signUp");
  };

  const redirectLogIn = async () => {
    navigate("/logIn");
  };

  const redirectToCatalog = async () => {
    navigate("/catalog");
  };

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
          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={6} sm={4} md={4} key={index}>
              <EventCard
                name={`Featured Event ${index}`}
                description={"Integer a imperdiet sapien. Ut congue mauris vel nisi mattis, sed dignissim. Nunc magna nisl, rhoncus a tincidunt, interdum et libero."}
                image={"https://picsum.photos/350/180"}
                price={Math.floor(Math.random() * 2500 + 150)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider variant="middle"/>
      <Box my={2}>
        <Typography gutterBottom variant="h5" component="h2">
          Get the most out of PPROMAT
        </Typography>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs/>
          <Grid item xs justifyContent={"center"}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box component={'div'}>
                <IconButton
                  alt='sign up icon'
                  sx={{ width: 180, height: 180, border: '2px solid', borderColor: 'primary.main'}}
                  color='secondary'
                  onClick={() => redirectToSignUp()}
                >
                  <PersonAddAlt1Icon sx={{fontSize: '112px'}}/>
                </IconButton>
              </Box>
              <Box component={'div'}>
                <Typography mt={2} variant='h6' component={'div'}>
                  Sign up!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box component={'div'}>
                <IconButton
                  alt='log in icon'
                  sx={{ width: 180, height: 180, border: '2px solid', borderColor: 'primary.main'}}
                  color='secondary'
                  onClick={() => redirectLogIn()}
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
          <Grid item xs>
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
          <Grid item xs/>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;