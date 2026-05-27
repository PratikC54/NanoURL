import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import api from "../api/api.js";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateShortUrl = async () => {
      if (!url) {
        navigate("/error", { state: { message: "Sorry, the page you are looking for does not exist." } });
        return;
      }

      try {
        await api.get(`/api/urls/validate/${url}`);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
      } catch (error) {
        navigate("/error", { state: { message: "Sorry, the page you are looking for does not exist." } });
      } finally {
        setLoading(false);
      }
    };

    validateShortUrl();
  }, [url, navigate]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white">
      <div className="text-center">
        <Hourglass
          visible={loading}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{ margin: "0 auto" }}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <h1 className="text-2xl font-bold mt-4">Redirecting...</h1>
      </div>
    </div>
  );
};

export default ShortenUrlPage;
