import { useState } from "react";
import "../styles/Login.css";
import { useUsersContext } from "../context/UsersContext";

export default function Login() {
  const { login } = useUsersContext();

  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-login">
      <h1 className="login">Connexion</h1>
      <form>
        <label htmlFor="name" className="label">
          Nom :{" "}
        </label>
        <div className="input">
          <input
            value={formValue.name}
            name="name"
            onChange={onChange}
            id="name"
            required
            label="name"
            type="text"
          />
        </div>
        <label htmlFor="password" className="label">
          Mot de passe :{" "}
        </label>
        <div className="input">
          <input
            value={formValue.password}
            name="password"
            onChange={onChange}
            id="password"
            required
            label="Mot de passe"
            type="password"
            autoComplete="on"
          />
        </div>
      </form>
      <button
        className="login-button"
        type="button"
        onClick={() => login(formValue)}
      >
        Valider
      </button>
    </div>
  );
}
