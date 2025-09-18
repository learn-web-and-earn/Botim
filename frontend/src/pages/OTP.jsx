import React, { useRef, useState, useEffect } from "react";
import { Lock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// OTP input component using shadcn Input
const OTPInputs = ({ length = 6, value = "", onChange }) => {
  const inputsRef = useRef([]);
  const digits = value.split("").slice(0, length);

  const focusNext = (idx) => {
    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };
  const focusPrev = (idx) => {
    if (idx > 0) inputsRef.current[idx - 1]?.focus();
  };

  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newDigits = [...Array(length)].map((_, i) => (i === idx ? v : digits[i] || ""));
    onChange(newDigits.join(""));
    if (v) focusNext(idx);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value) {
      focusPrev(idx);
      const newDigits = [...Array(length)].map((_, i) => (i === idx - 1 ? "" : digits[i] || ""));
      onChange(newDigits.join(""));
    }
    if (e.key === "ArrowLeft") focusPrev(idx);
    if (e.key === "ArrowRight") focusNext(idx);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, length);
    onChange(paste);
    paste.split("").forEach((ch, i) => {
      if (inputsRef.current[i]) inputsRef.current[i].value = ch;
    });
  };

  return (
    <div className="flex gap-3 justify-center mt-4" onPaste={handlePaste}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-12 h-12 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500"
          defaultValue={digits[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(150); // 2:30 in seconds

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const verify = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      // Redirect to PIN CODE page
      navigate("/pin-code");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resend = () => {
    alert("Resend OTP requested");
    setTimer(150); // reset timer to 2:30
  };

  return (
    <div className="min-h-screen flex mt-3 bg-white p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h3 className="text-sm font-semibold text-black">OTP Verification</h3>
            <p className="text-xs text-gray-500">Enter the 6-digit code sent to +92 3xx xxx xxxx</p>
          </div>
        </div>

        <Card className="shadow-md border border-gray-100 rounded-lg">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 grid place-items-center mb-4">
                <Lock size={28} className="text-gray-700" />
              </div>
              <CardTitle className="text-base text-black">Verify OTP</CardTitle>
              <CardDescription className="text-center text-sm text-gray-500">
                Enter the 6-digit code sent at <span className="font-medium">+92 3xx xxx xxxx</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mt-6">
              <Label className="mb-2 text-sm text-gray-600">One Time Password</Label>
              <OTPInputs length={6} value={otp} onChange={setOtp} />

              <div className="mt-6">
                <Button
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={verify}
                  disabled={otp.length < 6 || loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>

                <div className="mt-3 text-center text-sm text-gray-500">
                  <span>Didn't get code? </span>
                  <button onClick={resend} className="underline font-medium hover:text-gray-800">
                    Resend OTP
                  </button>
                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                  This code will expire in {formatTime(timer)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTP;
