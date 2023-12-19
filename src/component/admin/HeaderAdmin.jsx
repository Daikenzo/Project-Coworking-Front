import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import '../../css/header.css'

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt");

    navigate("/login");
  };

  const jwt = Cookies.get("jwt");
  const userData = jwtDecode(jwt);

  return (
    <header className="App-header">
      <nav className="App-nav header-nav">
        <ul>
          <li>
            <Link to={"/"}>Accueil</Link>
          </li>
          <li>
            <Link to={"/admin/coworkings"}>Liste des coworkings</Link>
          </li>
          <li>
            <Link to={"/admin/coworkings/create"}>Ajouter un coworking</Link>
          </li>
          <li>
            <p>Connecté en tant que <span>{userData.data.username}</span></p>
          </li>
          <li>
            <a href="#disconect" onClick={handleLogout}>
              Se déconnecter
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
