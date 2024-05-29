import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1 className="neonText">Oops!<br/>Sorry, an unexpected error has occurred.</h1>

      <p className="neonText">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
