import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VISA from "@/assets/VISA-logo.png";
import { Button } from "@/components/ui/button";

const CardBuilder = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      // Store a fake user
      const fakeUser = {
        name: "John Doe",
        cardNumber: cardNumber || "4523 3712 3456 7890",
        expiry: expiry || "08/29",
        cvv: cvv || "123",
      };
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setLoading(false);
      navigate("/"); // Redirect to Home
    }, 2000);
  };

  // Format card number as XXXX XXXX XXXX XXXX
  const formatCardNumber = (num) => num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

  // Format expiry as MM/YY
  const formatExpiry = (num) => {
    const onlyNums = num.replace(/\D/g, "");
    if (onlyNums.length <= 2) return onlyNums;
    return onlyNums.slice(0, 2) + "/" + onlyNums.slice(2, 4);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Card Preview */}
      <div className="relative w-full max-w-sm aspect-[16/10] rounded-xl shadow-lg overflow-hidden text-white p-4 transition-transform duration-500">
        {/* Front Side */}
        <div
          className="absolute inset-0 px-4 py-3 rounded-xl"
          style={{ backgroundColor: "#011fe5", backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">BOTIM</h1>
            <img src={VISA} alt="Visa" className="w-12" />
          </div>

          <div className="w-12 h-8 bg-gray-300 rounded-md mt-4"></div>

          <p className="mt-4 tracking-widest text-lg md:text-xl text-white">
            {cardNumber || "4523 3712 3456 7890"}
          </p>

          <div className="flex justify-between items-center mt-4 text-xs md:text-sm text-white">
            <div>
              <p className="uppercase text-gray-200">Valid Thru</p>
              <p>{expiry || "08/29"}</p>
            </div>
          </div>

          <p className="absolute top-14 right-4 uppercase text-sm md:text-base text-white">
            {cardHolder || "CARD HOLDER"}
          </p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 px-4 py-6 rounded-xl"
          style={{
            backgroundColor: "#011fe5",
            backfaceVisibility: "hidden",
            transform: showBack ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          <div className="w-full h-10 bg-black mb-6"></div>
          <div className="flex justify-end">
            <div className="bg-white text-black px-3 py-2 rounded-md">{cvv || "123"}</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="mt-8 w-full max-w-sm flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm md:text-base"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Card Holder</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm md:text-base uppercase"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm md:text-base"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm md:text-base"
              placeholder="123"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              onFocus={() => setShowBack(true)}
              onBlur={() => setShowBack(false)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white mt-4 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CardBuilder;
