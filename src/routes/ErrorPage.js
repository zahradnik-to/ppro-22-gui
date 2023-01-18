import PropTypes from "prop-types";

ErrorPage.propTypes = {
  errStatus: PropTypes.number,
  errMessage: PropTypes.string
};

ErrorPage.defaultProps = {
  errMessage: "Unexpected error occured."
};

function ErrorPage({errStatus, errMessage}) {
  return (
    <div>
      <h1>Error {errStatus}</h1>
      <p><i>{errMessage}</i></p>
    </div>
  );
}

export default ErrorPage;