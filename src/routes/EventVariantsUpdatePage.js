import {LinearProgress, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useGetEventAsSeller} from "../api/useEvent";
import VariantUpdateTable from "../components/VariantUpdateTable";
import useAuth from "../api/hooks/useAuth";

export default function EventVariantsUpdatePage() {
  const {eventId} = useParams();
  const {auth} = useAuth();
  const [event, eventLoaded, eventError] = useGetEventAsSeller({eventId, sellerId: auth.user.id});

  if (!eventLoaded) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <div>
      <Typography gutterBottom variant='h3' component='h1'>{event?.data?.name} variants</Typography>
      <Typography variant={'h6'} sx={{textDecoration: 'none', color: 'primary.main'}} component={Link} to={`/event/${event?.data?.id}`} gutterBottom>🔙Back to event</Typography>
      <VariantUpdateTable variantsList={event?.data?.variants} eventId={eventId}/>
    </div>
  );
}
