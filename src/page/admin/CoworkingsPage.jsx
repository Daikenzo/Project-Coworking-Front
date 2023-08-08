import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const CoworkingsPage = () => {
  // Init
  const [coworkings, setCoworkings] = useState([]);
  const [deleteCoworkingMessage, setDeleteCoworkingMessage] = useState(null);
  const navigate = useNavigate();
  // Fetch
  const fetchCoworkings = async () => {
    console.log("fetch")
    const response = await fetch("http://localhost:3010/api/coworkings", {
      method: "GET",
    });
    const responseJs = await response.json();
    setCoworkings(responseJs.data);
  };
  // React Reload Page (UseEffect) on Starttup and Delete Page
  useEffect(() => {
    // Set JWT Cookie into Browser
    console.log("coworkingpage")
    const jwt = Cookies.get("jwt");
    // Redirect to LoginPage if missing JWT
    if (!jwt) { navigate("/login");}
    // on décode le jwt
    const user = jwtDecode(jwt);
    // User Role Verification
    if (user.data.role === 3 || user.data.role === 2) {
      // is a Admin or Editor
    } else {
      navigate("/");
    }
    fetchCoworkings();
  }, [deleteCoworkingMessage, navigate]);
// Delete Coworking ActionClick & Function
  const handleDeleteCoworking = async (coworkingId) => {
    const token = Cookies.get("jwt");
    const responseDelete = await 
    fetch(`http://localhost:3010/api/coworkings/${coworkingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseDeleteJs = await responseDelete.json();
    setDeleteCoworkingMessage(responseDeleteJs.message);
  };
// Display
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
              <div className="App-container App-container">
                {coworking.picture && (
                <img className="App-image-container" src={coworking.picture} alt={coworking.name} />
                )}
              </div>
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
