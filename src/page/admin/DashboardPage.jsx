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

      <h2>Bonjour, Vous êtes sur le dashboard</h2>
    </>
  );
};

export default DashboardPage;
