import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import HeaderPublic from "../../component/public/HeaderPublic";

const CoworkingsPagePublic = () => {
  const [coworkings, setCoworkings] = useState([]);
  // Set Isconnected
  let isUserConnected = false;

  // Set and check jwt
  const jwt = Cookies.get("jwt");
  if (jwt) {
    const decodedJwt = jwtDecode(jwt);
    const role = decodedJwt.data.role;

    if (role === 1 || role === 2 || role === 3) {
      isUserConnected = true;
    }
  }
  const fetchCoworkings = async () => {
    const response = await fetch("http://localhost:3010/api/coworkings", {
      method: "GET",
    });
    const responseJs = await response.json();
    setCoworkings(responseJs.data);
  };

  useEffect(() => {
    fetchCoworkings();
  }, []);

  const handleCreateReview = async (event, coworkingId) => {
    // empêche le rechargement de la page
    event.preventDefault();
    
    // récupérer les données du formulaire
    const content = event.target.content.value;
    const rating = event.target.rating.value;

    // créer un objet avec les données du formulaire
    // tel qu'il est attendu par l'api
    const reviewCreateData = {
      content: content,
      rating: parseInt(rating),
    };

    // récupère le jwt dans les cookies
    const jwt = Cookies.get("jwt");

    // je fais l'appel fetch de création
    // en lui passant les données du form
    // en body
    // et le jwt en header
    const responseReview = await fetch(`http://localhost:3010/api/reviews/${coworkingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(reviewCreateData),
    });

    const responseReviewJs = await responseReview.json();

    // console.log(responseReviewJs);
  };

  return (
    <>
      <HeaderPublic />
      <main className="App-main"> 
        <div className="App-container">
          <h1>Liste des coworkings</h1>
          {coworkings.map((coworking) => (
            <div className="App-container" key={coworking.id}>
              <h2>{coworking.name}</h2>
              <p>
                Adresse :{coworking.address.number} {coworking.address.street} - {coworking.address.postcode}
                {coworking.address.city}
              </p>
              {isUserConnected && (
                <form className="App-container App-form" onSubmit={(event) => handleCreateReview(event, coworking.id)}>
                  <div className="App-container App-form App-nav">
                    <label htmlFor="content">Votre review</label>
                    <textarea name="content" rows="4" cols="50"></textarea>
                  </div>
                  <div className="App-container App-form App-nav">
                    <label htmlFor="rating">Votre note</label>
                    <input type="number" name="rating" min="0" max="5" />
                  </div>
                  <div className="App-container App-form App-nav">
                    <button type="submit">Créer la review</button>
                  </div>
                  
                </form>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CoworkingsPagePublic;
