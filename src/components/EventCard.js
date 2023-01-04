import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default function EventCard({name, description, image, price}) {
  return(
    <Card sx={{ maxWidth: 345 }}>
      <Badge
        color="secondary"
        badgeContent={`${price} Kč`} showZero
        overlap="circular"
      >
        <CardMedia
          component="img"
          height="140"
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
      <CardActions>
        <Button size="small">More info</Button>
      </CardActions>
    </Card>
  );
}