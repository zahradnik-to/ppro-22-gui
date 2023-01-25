import {LinearProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetEvent, useGetEventAsSeller} from "../api/useEvent";
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
      <Typography gutterBottom variant='h3' component='h1'>{event.name}</Typography>
      <VariantUpdateTable variants={event.data.variants} setVariants={() => {console.log("TODO")}} eventId={eventId}/>
    </div>
  );
}
