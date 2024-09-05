import React from "react";
import "../assets/styles/Error.css";

const Error = ({ error, setErrorPopup }) => {
  return (
    <div className="container-error">
      <h1>Mensagem de erro</h1>
      {error.birthday && <p>{error?.birthday}</p>}
      {error.phone && <p>{error?.phone}</p>}
      {error && <p>{error}</p>}
      <button onClick={() => setErrorPopup(false)}>Fechar Mensagem</button>
    </div>
  );
};
export default Error;
