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
          <form className="formcontainer">
            <label htmlFor="name">Prénom</label>
            <input type="text" name="name" id="name" value={user.name} />
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={user.lastname}
            />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={user.email} />
            <label htmlFor="street">Rue</label>
            <input type="text" name="street" id="street" value={user.street} />
            <label htmlFor="postcode">Code Postal</label>
            <input
              type="number"
              name="postcode"
              id="postcode"
              value={user.postcode}
            />
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="number"
              name="telephone"
              id="telephone"
              value={user.telephone}
            />
          </form>
          <button type="button" className="modify-account">
            Modifier mes données
          </button>
        </div>
        <p className="my-order">Mes commandes :</p>
      </div>
    </>
  );
}

export default Account;
