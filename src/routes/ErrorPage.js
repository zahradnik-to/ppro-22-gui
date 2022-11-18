import { useRouteError } from "react-router-dom";


function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Error {error.status}</h1>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  );
}

export default ErrorPage;