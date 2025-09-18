import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "@/assets/loading.png";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    const timer = setTimeout(() => {
      if (!storedUser) {
        navigate('/login');
      } else {
        setUser(JSON.parse(storedUser)); // Parse the stored JSON user
      }
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <div className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-xl font-bold text-blue-900 mb-4">Dear {user.name},</h1>
        <p className="text-sm text-blue-700 mb-6">
          We have received your request. Our team will verify your details and update your account.
          Please wait for <span className="font-semibold">24 hours</span>. Thank you.
        </p>
        <Button
          onClick={handleLogout}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Login Again
        </Button>
      </div>
    </div>
  );
};

export default Home;
