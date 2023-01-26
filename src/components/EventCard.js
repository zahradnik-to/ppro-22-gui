import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  eventState: PropTypes.string,
};

EventCard.defaultProps = {
  eventState: "CREATED",
};

const stateColors = {
  CANCELLED: {
    bg: "red",
    color: "black",
  },
  FINISHED: {
    bg: "primary.main",
    color: "secondary.main",
  },
}

export default function EventCard({id, name, description, image, eventState}) {
  const navigate = useNavigate();
  const isActive = eventState === "CREATED";

  const handleCardOnClick = () => {
    navigate(`/event/${id}`)
  }

  return (
    <Card>
      <CardActionArea onClick={() => handleCardOnClick()}>
        {!isActive &&
          <Box component="span" sx={{
            position: 'absolute',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: "500",
            fontFamily: "\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
            backgroundColor: stateColors[eventState].bg,
            color: stateColors[eventState].color,
            zIndex: 999,
            left: 16,
            top: 16,
            px: 2,
            py: 1,
          }}>
            {eventState}
          </Box>
        }
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="Event image"
          sx={{filter: !isActive ? "grayscale(100%)" : "none"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
                      sx={{textDecoration: !isActive ? "line-through" : ""}}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}