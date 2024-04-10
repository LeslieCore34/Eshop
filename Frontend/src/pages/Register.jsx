import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";
import { useUsersContext } from "../context/UsersContext";

export default function Register() {
  const navigate = useNavigate;

  const { register } = useUsersContext();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    street: "",
    postcode: "",
    city: "",
    telephone: "",
  });

  const updateRegisterForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(formData);
    register(formData);
    navigate("/login");
  };

  return (
    <div className=" container-registration ">
      <h1 className="register">Inscription</h1>
      <div className="allow-scroll">
        <form className="registration-form">
          <label htmlFor="name" className="label">
            Prénom
          </label>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => updateRegisterForm("name", e.target.value)}
            />
          </div>

          <label htmlFor="lastname" className="label">
            Nom
          </label>
          <div>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required
              value={formData.lastname}
              onChange={(e) => updateRegisterForm("lastname", e.target.value)}
            />
          </div>

          <label htmlFor="email" className="label">
            Email
          </label>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => updateRegisterForm("email", e.target.value)}
            />
          </div>

          <label htmlFor="password" className="label">
            Mot de passe
          </label>
          <div>
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) => updateRegisterForm("password", e.target.value)}
            />
          </div>

          <label htmlFor="street" className="label">
            Rue
          </label>
          <div>
            <input
              type="text"
              name="street"
              id="street"
              value={formData.street}
              onChange={(e) => updateRegisterForm("street", e.target.value)}
            />
          </div>

          <label htmlFor="postcode" className="label">
            Code postal
          </label>
          <div>
            <input
              type="text"
              name="postcode"
              id="postcode"
              value={formData.postcode}
              onChange={(e) => updateRegisterForm("postcode", e.target.value)}
            />
          </div>
          <label htmlFor="city" className="label">
            Ville
          </label>
          <div>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={(e) => updateRegisterForm("city", e.target.value)}
            />
          </div>
          <label htmlFor="telephone" className="label">
            Téléphone
          </label>
          <div>
            <input
              type="text"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={(e) => updateRegisterForm("telephone", e.target.value)}
            />
          </div>
          <div className="form-button">
            <button type="submit" onClick={handleSubmit}>
              Valider
            </button>
          </div>
        </form>

        <Link to="/connexion">
          <p>
            Déjà inscrit ? <br />
            Connectez-vous !
          </p>
        </Link>
      </div>
    </div>
  );
}
