import { useState } from "react";
import "../styles/Account.css";
import { useLoaderData } from "react-router-dom";

function Account() {
  const givenData = useLoaderData();
  const [user] = useState(givenData?.preLoadUser?.data || {});
  return (
    <div className="account-container">
      <div>Mon compte</div>
      <div>
        {" "}
        Account info
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.lastname}</p>
        <p>{user.street}</p>
        <p>{user.postcode}</p>
        <p>{user.telephone}</p>
      </div>
    </div>
  );
}

export default Account;
