import React, { useState } from "react";
import { Lock, ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PINCODE = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);

    // Simulate 2s loading
    setTimeout(() => {
      setLoading(false);
      navigate("/card"); // redirect to Card page
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      {/* Top Bar */}
      <div className="flex items-center w-full max-w-sm mb-6">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <h2 className="text-lg font-semibold ml-2 text-black">Enter PIN</h2>
      </div>

      {/* PIN Card */}
      <div className="w-full max-w-sm bg-white shadow-md border border-gray-100 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 grid place-items-center mb-4">
            <Lock size={28} className="text-gray-700" />
          </div>
          <p className="text-center text-sm text-gray-500 mb-4">
            Enter your 4-digit PIN to continue
          </p>

          {/* PIN Input */}
          <Input
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
          />

          {/* Verify Button */}
          <Button
            className={`w-full h-12 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
            onClick={handleVerify}
            disabled={pin.length < 4 || loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PINCODE;
