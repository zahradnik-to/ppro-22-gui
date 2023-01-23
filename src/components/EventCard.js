import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default function EventCard({id, name, description, image}) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/event/${id}`)
  }

  return(
    <Card>
      <CardActionArea onClick={() => handleCardOnClick()}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="Event image"
        />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { name }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { description }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}