import { useState } from "react";
import "../styles/Account.css";
import { useLoaderData } from "react-router-dom";

function Account() {
  const givenData = useLoaderData();
  const [user] = useState(givenData?.preLoadUser?.data || {});
  return (
    <>
      <div className="account-container">
        <div className="account-small-container">
          <div className="myaccount">Mon compte :</div>
          <div className="data">
            <p>Prénom : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Nom : {user.lastname}</p>
            <p>Rue : {user.street}</p>
            <p>Code postal : {user.postcode}</p>
            <p>Téléphone : {user.telephone}</p>
          </div>
          <button type="button">Modifier mes données</button>
        </div>
        <p className="my-order">Mes commandes :</p>
      </div>
    </>
  );
}

export default Account;
