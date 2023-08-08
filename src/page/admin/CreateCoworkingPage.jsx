import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import Cookies from "js-cookie";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const CreateCoworkingPage = () => {
  const navigate = useNavigate();
  //Check Token & Init
  const token = Cookies.get("jwt");
  const user = token? (jwtDecode(token)) : (null);
  // Form Submit function
  const handleCreateCoworking = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const superficy = event.target.superficy.value;
    const capacity = event.target.capacity.value;
    const price_hour = event.target.price_hour.value;
    const price_day = event.target.price_day.value;
    const price_month = event.target.price_month.value;
    const address_number = event.target.address_number.value;
    const address_street = event.target.address_street.value;
    const address_postcode = event.target.address_postcode.value;
    const address_city = event.target.address_city.value;
    const UserId = user? user.UserId : 0;
    // Set Coworking Data
    const coworkingData = {
      name: name,
      price: {
        hour: parseInt(price_hour),
        day: parseInt(price_day),
        month: parseInt(price_month),
      },
      superficy: parseInt(superficy),
      capacity: parseInt(capacity),
      address: {
        number: parseInt(address_number),
        street: address_street,
        postCode: parseInt(address_postcode),
        city: address_city,
      }
    };
    // Génération clé json pour les données du formulaire
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);
    formData.append("data", JSON.stringify(coworkingData));
    // Get JWT Token and Fetch (With Header Authorization) and stock JSon
    const token = Cookies.get("jwt");
    const responseCreate = await 
    fetch("http://localhost:3010/api/coworkings/withImg", {
      method: "POST",
      body: formData,
      headers: {
      //  "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseCreateJs = await responseCreate.json();
    // Test  console.log(responseCreateJs);
    // Redirect into Coworking Page
    navigate("/admin/coworkings");
  };
// Redirect if not Token Cookie
  useEffect(() => {
    if (!Cookies.get("jwt")) {
      navigate("/login");
    }
  }, []);
// Display
  return (
    <>
      <HeaderAdmin />
      <main className="App-main">
        <div className="App-conainer">
          <form className="App-form" onSubmit={handleCreateCoworking}>
            <div className="App-nav">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div className="App-nav">
              <label htmlFor="superficy">Superficy</label>
              <input type="number" name="superficy" />
            </div>
            <div className="App-nav">
              <label htmlFor="capacity">Capacity</label>
              <input type="number" name="capacity" />
            </div>
            <div className="App-nav">
              <label htmlFor="price_hour">Price by hour</label>
              <input type="number" name="price_hour" />
            </div>
            <div className="App-nav">
              <label htmlFor="price_day">Price by day</label>
              <input type="number" name="price_day" />
            </div>
            <div className="App-nav">
              <label htmlFor="price_month">Price by month</label>
              <input type="number" name="price_month" />
            </div>
            <div className="App-nav">
              <label htmlFor="address_number">Address number</label>
              <input type="number" name="address_number" />
            </div>
            <div className="App-nav">
              <label htmlFor="address_street">Address street</label>
              <input type="text" name="address_street" />
            </div>
            <div className="App-nav">
              <label htmlFor="address_postcode">Address zipcode</label>
              <input type="number" name="address_postcode" />
            </div>
            <div className="App-nav">
              <label htmlFor="address_city">Address city</label>
              <input type="text" name="address_city" />
            </div>
            <div className="App-nav">
              <label htmlFor="image">Image de Présentation : </label>
              <input type="file" name="image" />
            </div>
            <div><input type="submit" /></div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateCoworkingPage;
