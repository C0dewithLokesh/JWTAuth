"use client";
import Navbar from "@/components/Navbar";
import { encode_jwt } from "@lokesh-kaushik/jwt-auth";
import { useState } from "react";

const Home = () => {
  const [secret, setSecret] = useState("");
  const [id, setId] = useState("");
  const [payload, setPayload] = useState("");
  const [ttl, setTtl] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [decodeResult, setDecodeResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateJWT = () => {
    if (!secret) {
      setError("Please enter a JWT secret key");
      return;
    }
    if (!id) {
      setError("Please enter an ID (number | string)");
      return;
    }
    if (!payload) {
      setError("Please enter a payload as JSON object");
      return;
    }
    setError("");
    try {
      const payloadObject = JSON.parse(payload);
      const ttlNumber = ttl ? parseInt(ttl, 10) : undefined;
      const token = encode_jwt(secret, id, payloadObject, ttlNumber);
      setGeneratedToken(token);
      setValidationResult(null);
      setDecodeResult(null);
    } catch (error) {
      console.log(error);
      setError("Invalid payload format. Please ensure it is valid JSON.");
    }
  };

  const handleDecodeJWT = async () => {
    setError("");
    setValidationResult(null);
    try {
      const response = await fetch("/api/decode-jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${generatedToken}`,
        },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      setDecodeResult(data);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleValidateJWT = async () => {
    setError("");
    setDecodeResult(null);
    try {
      const response = await fetch("/api/verify-jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${generatedToken}`,
        },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      setValidationResult(data);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="app min-h-screen flex flex-col items-center gap-20 py-10">
      <Navbar />

      <div className="demoContent w-full flex flex-col gap-12 px-5 sm:px-20">
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Generate JWT</h2>
          <div className="generateForm w-full flex justify-center flex-col-reverse sm:flex-row sm:gap-20">
            <div className="left w-full flex flex-col">
              <input
                type="text"
                placeholder="Secret"
                className="input mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <input
                type="text"
                placeholder="ID"
                className="input mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                className="btn bg-primary px-4 py-2 rounded-md text-white"
                onClick={handleGenerateJWT}
              >
                Generate JWT
              </button>
            </div>

            <div className="right w-full flex flex-col">
              <textarea
                placeholder="Payload (JSON)"
                className="textarea mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm min-h-24"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
              />
              <input
                type="number"
                placeholder="TTL (seconds)"
                className="input mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
              />
            </div>
          </div>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>

        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl font-bold text-primary">
            Decode & Validate JWT
          </h2>
          <div className="verificationContent flex flex-col gap-5 w-full items-start sm:gap-20 sm:flex-row">
            <div className="verificationInputs w-full flex flex-col ">
              <textarea
                placeholder="JSON Web Token"
                className="textarea mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm w-full h-full"
                value={generatedToken}
                onChange={(e) => {
                  setGeneratedToken(e.target.value);
                  setDecodeResult(null);
                  setValidationResult(null);
                }}
              />
              <input
                type="text"
                placeholder="Secret for Verification"
                className="input mb-2 p-2 border border-gray-400 outline-gray-400 text-black rounded-sm"
                value={secret}
                onChange={(e) => {
                  setSecret(e.target.value);
                  setDecodeResult(null);
                  setValidationResult(null);
                }}
              />
            </div>
            <div className="verificationBtns flex gap-5 sm:flex-col">
              <button
                className="btn bg-primary px-4 py-2 rounded-md text-white text-nowrap"
                onClick={handleDecodeJWT}
              >
                Decode JWT
              </button>
              <button
                className="btn bg-primary w-full px-4 py-2 rounded-md text-white text-nowrap"
                onClick={handleValidateJWT}
              >
                Validate JWT
              </button>
            </div>
          </div>
        </div>

        <div className="results flex-row justify-between w-full gap-10 sm:flex-col">
          {decodeResult && (
            <div className="w-full border-2 broder-primary p-5 rounded-md">
              <h2 className="text-lg font-bold mb-2 text-primary">
                Decoded JWT
              </h2>
              <pre className="textarea mb-2 text-wrap">
                {JSON.stringify(decodeResult, null, 2)}
              </pre>
            </div>
          )}

          {validationResult && (
            <div className="w-full border-2 broder-primary p-5 rounded-md">
              <h2 className="text-lg font-bold mb-2 text-primary">
                Validation Result
              </h2>
              <pre className="textarea mb-2 text-wrap text-black">
                {JSON.stringify(validationResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
