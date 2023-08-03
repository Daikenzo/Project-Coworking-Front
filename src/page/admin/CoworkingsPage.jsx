import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const CoworkingsPage = () => {
  const [coworkings, setCoworkings] = useState([]);
  const [deleteCoworkingMessage, setDeleteCoworkingMessage] = useState(null);

  const navigate = useNavigate();

  const fetchCoworkings = async () => {
    const response = await fetch("http://localhost:3010/api/coworkings", {
      method: "GET",
    });
    const responseJs = await response.json();

    setCoworkings(responseJs.data);
  };

  // useEffect avec la variable deleteCoworkingMessage
  // dans le tableau, permet de dire qu'on executer
  // la fonction fetchCoworkings à chaque fois que
  // la variable deleteCoworkingMessage est modifiée
  useEffect(() => {
    // on récupère le token jwt en cookie
    const jwt = Cookies.get("jwt");

    // s'il existe pas, ça veut que l'utilisateur n'est pas connecté
    // on le redirige vers la page de login
    if (!jwt) {
      navigate("/login");
    }

    // on décode le jwt
    const user = jwtDecode(jwt);
    console.log(user)
    // on vérifie son rôle :
    // s'il a un role admin ou editor,
    // on le redirige vers l'accueil admin
    if (user.data.role === 3 || user.data.role === 2) {
      // navigate("/admin");
      // sinon on le redirige vers l'accueil public
    } else {
      navigate("/");
    }

    fetchCoworkings();
  }, [deleteCoworkingMessage]);

  const handleDeleteCoworking = async (coworkingId) => {
    const token = Cookies.get("jwt");

    const responseDelete = await fetch(`http://localhost:3010/api/coworkings/${coworkingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseDeleteJs = await responseDelete.json();

    setDeleteCoworkingMessage(responseDeleteJs.message);
  };

  return (
    <>
      <HeaderAdmin />
      <main className="App-main">
        <div>
          <h1>Liste des coworkings</h1>
          {deleteCoworkingMessage && <p>{deleteCoworkingMessage}</p>}
          {coworkings.map((coworking) => (
            <div key={coworking.id}>
              <h2>{coworking.name}</h2>
              <p>
                Adresse :{coworking.address.number} {coworking.address.street} - {coworking.address.postcode}
                {coworking.address.city}
              </p>
              <Link to={`/admin/coworkings/${coworking.id}/update`}>Mettre à jour le coworking</Link>
              <button onClick={() => handleDeleteCoworking(coworking.id)}>Supprimer le coworking</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CoworkingsPage;
