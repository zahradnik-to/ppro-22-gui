import Grid from "@mui/material/Grid";
import EventCard from "../components/EventCard";
import Box from "@mui/material/Box";

function CatalogPage() {
  return (
    <Box mt={2}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <EventCard
              name={`Event ${index}`}
              description={"Integer a imperdiet sapien. Ut congue mauris vel nisi mattis, sed dignissim. Nunc magna nisl, rhoncus a tincidunt, interdum et libero."}
              image={"https://picsum.photos/350/140"}
              price={Math.floor(Math.random()*2500 + 150)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CatalogPage;
