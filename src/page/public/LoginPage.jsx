import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const loginResponse = await fetch("http://localhost:3010/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, password }),
    });

    // si la réponse est valide
    if (loginResponse.status === 200) {
      const loginData = await loginResponse.json();

      // je récupère le jwt dans le data
      const jwt = loginData.data;

      // je stocke le jwt dans un cookie
      Cookies.set("jwt", jwt);

      // on récupère le username dans le jwt
      // on récupère toutes les infos de l'user via l'api
      // en fonction du rôle récupéré avec l'appel fetch
      // on redirige vers l'accueil admin si le role est admin ou editor
      // sinon on redirige vers l'accueil public

      const user = jwtDecode(jwt);

      if (user.data.role === 3 || user.data.role === 2) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>

      <input type="submit" />
    </form>
  );
};

export default LoginPage;
