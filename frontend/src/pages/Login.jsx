import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react"; // add Loader2 icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoginImage from '@/assets/Login.png'


const countryCodes = {
  us: "+1",
  pk: "+92",
  in: "+91",
  uk: "+44",
};

const Login = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("us");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/otp");
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-white">
      {/* Top Bar */}
      <div className="flex items-center w-full px-4 py-2">
        <ArrowLeft size={22} className="text-black" />
      </div>

      {/* Illustration */}
      <div className="mt-2">
        <img
          src={LoginImage}
          alt="Illustration"
          className="w-32 h-32"
        />
      </div>

      {/* Title */}
      <h1 className="text-lg font-bold mt-4">Your Phone Number</h1>
      <p className="text-gray-500 text-center text-sm mt-1 px-10">
        Botim will need your phone number to verify your account.
      </p>

      {/* Form */}
      <div className="w-full px-6 mt-6 space-y-3">
        {/* Country Select */}
        <Select onValueChange={(value) => setCountry(value)}>
          <SelectTrigger className="w-full h-12 text-left border rounded-lg px-3 flex items-center">
            <SelectValue placeholder="United States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="pk">Pakistan</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
          </SelectContent>
        </Select>

        {/* Phone Input */}
        <div className="flex items-center mt-0 border rounded-lg px-3 h-12">
          <span className="text-gray-600 mr-2 flex items-center">
            {countryCodes[country]}
          </span>
          <Input
            type="text"
            placeholder="139 133 1778 8"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-full border-0 focus-visible:ring-0 focus:outline-none shadow-none"
          />
        </div>

        {/* Migrate Link */}
        <div className="flex justify-center mt-1">
          <button className="text-blue-500 text-sm">
            Migrate from old phone
          </button>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full px-6 mt-auto mb-6">
        <Button
          onClick={handleNext}
          disabled={loading}
          className={`w-full h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center ${loading ? "cursor-not-allowed" : ""
            }`}
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2 w-5 h-5" />
          ) : null}
          {loading ? "Loading..." : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
