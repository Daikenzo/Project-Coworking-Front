import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import Cookies from "js-cookie";

const UpdateCoworkingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coworking, setCoworking] = useState(null);

  const fetchCoworking = async () => {
    const responseCoworking = await fetch(`http://localhost:3010/api/coworkings/${id}`);
    const responseCoworkingJs = await responseCoworking.json();

    setCoworking(responseCoworkingJs.data);
  };

  const handleUpdateCoworking = async (event) => {
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

    const coworkingData = {
      name: name,
      price: {
        hour: price_hour ? parseInt(price_hour) : null,
        day: price_day ? parseInt(price_day) : null,
        month: price_month ? parseInt(price_month) : null,
      },
      superficy: superficy ? parseInt(superficy) : superficy,
      capacity: capacity ? parseInt(capacity) : null,
      address: {
        number: address_number ? parseInt(address_number) : null,
        street: address_street,
        postCode: address_postcode ? parseInt(address_postcode) : null,
        city: address_city,
      },
    };

    const token = Cookies.get("jwt");

    const responseUpdate = await fetch(`http://localhost:3010/api/coworkings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(coworkingData),
    });

    if (responseUpdate.status === 200) {
      navigate("/admin/coworkings");
    }
  };

  useEffect(() => {
    if (!Cookies.get("jwt")) {
      navigate("/login");
    }

    fetchCoworking();
  }, []);

  return (
    <>
      <HeaderAdmin />
      <form onSubmit={handleUpdateCoworking}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" defaultValue={coworking && coworking.name} />
        </div>

        <div>
          <label htmlFor="superficy">Superficy</label>
          <input type="number" name="superficy" defaultValue={coworking && coworking.superficy} />
        </div>

        <div>
          <label htmlFor="capacity">Capacity</label>
          <input type="number" name="capacity" defaultValue={coworking && coworking.capacity} />
        </div>

        <div>
          <label htmlFor="price_hour">Price by hour</label>
          <input type="number" name="price_hour" defaultValue={coworking && coworking.price.hour} />
        </div>

        <div>
          <label htmlFor="price_day">Price by day</label>
          <input type="number" name="price_day" defaultValue={coworking && coworking.price.day} />
        </div>

        <div>
          <label htmlFor="price_month">Price by month</label>
          <input type="number" name="price_month" defaultValue={coworking && coworking.price.month} />
        </div>

        <div>
          <label htmlFor="address_number">Address number</label>
          <input type="number" name="address_number" defaultValue={coworking && coworking.address.number} />
        </div>

        <div>
          <label htmlFor="address_street">Address street</label>
          <input type="text" name="address_street" defaultValue={coworking && coworking.address.street} />
        </div>

        <div>
          <label htmlFor="address_postcode">Address zipcode</label>
          <input type="number" name="address_postcode" defaultValue={coworking && coworking.address.postCode} />
        </div>

        <div>
          <label htmlFor="address_city">Address city</label>
          <input type="text" name="address_city" defaultValue={coworking && coworking.address.city} />
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default UpdateCoworkingPage;
