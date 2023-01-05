import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import CardActionArea from "@mui/material/CardActionArea";

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default function EventCard({name, description, image, price}) {
  return(
    <Card>
      <CardActionArea onClick={() => console.log(name)}>
      <Badge
        color="secondary"
        badgeContent={`${price} Kč`} showZero
        overlap="circular"
      >
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="green iguana"
        />
      </Badge>
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