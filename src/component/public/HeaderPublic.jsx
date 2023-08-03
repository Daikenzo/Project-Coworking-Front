import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const HeaderPublic = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt");

    navigate("/login");
  };

  const jwt = Cookies.get("jwt");

  const userData = jwt? (jwtDecode(jwt)) : (null);


  return (
    <header className="App-header">
      <nav className="App-nav">
        <ul>
          <li>
            <Link to={"/"}>Accueil</Link>
          </li>
          <li>
            <Link to={"/coworkings"}>Liste des coworkings</Link>
          </li>
          {userData? (<>
          <li>
            <p>Page de {userData.data.username}</p>
          </li>
          {userData.data.role > 1 && (
            <li><Link to={"/admin/"}>Dashdoard</Link>
          </li>
          )}
          <li>
            <p><a href="/login#disconect" onClick={handleLogout}>
              Se déconnecter
            </a></p>
          </li>
          </>) : ( <>
          <li>
            <p><Link to={"/login"}>Connection</Link></p>
          </li>
          </>)
          }
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPublic;
