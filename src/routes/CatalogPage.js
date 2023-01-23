import Grid from "@mui/material/Grid";
import EventCard from "../components/EventCard";
import {useListEvents} from "../api/useEvent";
import {LinearProgress} from "@mui/material";

function CatalogPage() {

  const [getEventsResult, getEventsLoaded, getEventsError] = useListEvents({search: ""});

  if (!getEventsLoaded) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {getEventsResult?.data.map((event) => (
        <Grid item xs={2} sm={4} md={4} key={event.id}>
          <EventCard
            id={event.id}
            name={event.name}
            description={event.shortDescription}
            image={`data:image/*;base64,${event.image}`}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CatalogPage;
