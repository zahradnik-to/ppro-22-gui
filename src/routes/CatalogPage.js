import Grid from "@mui/material/Grid";
import EventCard from "../components/EventCard";

function CatalogPage() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {Array.from(Array(8)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
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
  );
}

export default CatalogPage;
