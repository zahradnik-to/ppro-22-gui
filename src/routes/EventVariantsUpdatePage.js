import {LinearProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useListVariants} from "../api/useVariant";
import {useGetEvent} from "../api/useEvent";
import VariantUpdateTable from "../components/VariantUpdateTable";

export default function EventVariantsUpdatePage() {
  const {id} = useParams();
  const [event, eventLoaded, eventError] = useGetEvent({id});
  const [variants, variantsLoaded, variantsError, setVariants] = useListVariants({eventId: id});

  if (!(eventLoaded && variantsLoaded)) {
    return <LinearProgress color="secondary"/>
  }

  return (
    <div>
      <Typography gutterBottom variant='h3' component='h1'>{event.name}</Typography>
      <VariantUpdateTable variants={variants} setVariants={setVariants} eventId={id}/>
    </div>
  );
}
