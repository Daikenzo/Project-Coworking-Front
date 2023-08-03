import Cookies from "js-cookie";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("jwt")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <HeaderAdmin />
      <main className="App-main">
        <div className="App-container">
          <h1>DASHBOARD</h1>
          <div>
            <p>Bonjour, vous êtes dans le Dashboard</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
