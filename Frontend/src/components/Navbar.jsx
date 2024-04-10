import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="NavBar-container">
      <div className="left-container">
        <div className="siteTitle">Eshop</div>
        <Link className="link" to="/home">
          Accueil
        </Link>
        <Link className="link" to="/women">
          Mode Femme
        </Link>
        <Link className="link" to="/men">
          Mode Homme
        </Link>
      </div>
      <div className="right-container">
        <Link className="link" to="/account">
          Mon Compte
        </Link>
        <Link className="link" to="/register">
          Inscription
        </Link>
        <Link className="link" to="/login">
          Connexion
        </Link>
        <Link className="link" to="/cart">
          Panier
        </Link>
      </div>
    </nav>
  );
}
