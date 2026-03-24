"use client";
import { useState } from "react";

export default function Home() {

  const [form, setForm] = useState({
    business: "",
    location: "",
    budget: "",
    website: "",
    goal: "Calls",
    intent: "Urgent",
    usp: "Cheapest",
    offer: "",
    schedule: "24/7",
    days: [] as string[],
    startTime: "",
    endTime: "",
    phone: "",
    keywords: "",
    competitor1: "",
    competitor2: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

const [ads, setAds] = useState<any>(null);

  // INPUT HANDLE
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADS GENERATE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate-ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify(form),
      });

      const data = await res.json();

      setResult(data);
      alert("Ads Generated 🚀");
    } catch (err) {
      console.error(err);
      alert("Error aaya ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-md"/>

        <h1 className="text-3xl font-bold mb-6">AdManager AI</h1>

        {/* STEP 1 */}
        <h2 className="mb-3 text-xl">Step 1: Business Info</h2>

        <input name="business" placeholder="Business Name"
          className="input" onChange={handleChange} />

        <input name="location" placeholder="Location"
          className="input" onChange={handleChange} />

        <input name="budget" placeholder="Daily Budget ₹"
          className="input" onChange={handleChange} />

        <input name="website" placeholder="Website URL (optional)"
          className="input" onChange={handleChange} />

        {/* STEP 2 */}
        <h2 className="mt-6 mb-3 text-xl">Step 2: Goal & Intent</h2>

        <select name="goal" className="input" onChange={handleChange}>
          <option>Calls</option>
          <option>Leads</option>
          <option>Booking</option>
          <option>Sales</option>
        </select>

        <select name="intent" className="input" onChange={handleChange}>
          <option>Urgent</option>
          <option>Price Compare</option>
          <option>Research</option>
        </select>

        <select name="usp" className="input" onChange={handleChange}>
          <option>Cheapest</option>
          <option>Fast Service</option>
          <option>Premium Quality</option>
        </select>

        {/* STEP 3 */}
        <h2 className="mt-6 mb-3 text-xl">Step 3: Ads Setup</h2>

        <input name="phone" placeholder="Phone Number"
          className="input" onChange={handleChange} />

        {/* ADVANCED */}
        <h2 className="mt-6 mb-3 text-xl">Advanced</h2>

        <input name="keywords"
          placeholder="Customer kya search karta hai"
          className="input"
          onChange={handleChange}
        />

        {/* 🔥 CONNECT GOOGLE BUTTON */}
        <button
          onClick={() => {
            const url =
              "https://accounts.google.com/o/oauth2/v2/auth?" +
              `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
              "&redirect_uri=https://musical-happiness-pjxpxvq6957rf756-3000.app.github.dev/api/auth/callback" +
              "&response_type=code" +
              "&scope=https://www.googleapis.com/auth/adwords" +
              "&access_type=offline"+
              "&prompt=consent";

            window.location.href = url;
          }}
          className="w-full bg-green-500 p-3 rounded mt-4"
        >
          Connect Google Ads
        </button>

        {/* GENERATE ADS BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 p-3 rounded mt-4"
        >
          {loading ? "Generating..." : "Generate & Launch Ads"}
        </button>


        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 bg-gray-900 rounded">

            <h3 className="font-bold">Headlines</h3>
            {result?.headlines?.map((h: string, i: number) => (
              <p key={i}>• {h}</p>
            ))}

            <h3 className="font-bold mt-4">Descriptions</h3>
            {result?.descriptions?.map((d: string, i: number) => (
              <p key={i}>• {d}</p>
            ))}

            <h3 className="font-bold mt-4">Keywords</h3>
            {result?.keywords?.map((k: string, i: number) => (
              <p key={i}>• {k}</p>
            ))}

          </div>
        )}
  
{ads && (
  <div style={{ marginTop: 20 }}>
    <h2>Generated Ads 🚀</h2>

    <h3>Headlines</h3>
    <ul>
      {ads.headlines?.map((h: string, i: number) => (
        <li key={i}>{h}</li>
      ))}
    </ul>

    <h3>Descriptions</h3>
    <ul>
      {ads.descriptions?.map((d: string, i: number) => (
        <li key={i}>{d}</li>
      ))}
    </ul>

    <h3>Keywords</h3>
    <ul>
      {ads.keywords?.map((k: string, i: number) => (
        <li key={i}>{k}</li>
      ))}
    </ul>
  </div>
)}
    </main>
  );
}