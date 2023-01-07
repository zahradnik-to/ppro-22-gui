import {useParams} from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams();
  return (
    <div>Event Id: {id}</div>
  );
}