import { useState } from "react";
import URLInput from "./components/URLInput";
import Loading from "./components/Loading";
import Error from "./components/Error";
import ReportCard from "./components/ReportCard";
import api from "./services/api";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await api.post("/analyze", {
        url,
      });

      setReport(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Page Pulse
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Website Audit Tool
        </p>

        <URLInput
          url={url}
          setUrl={setUrl}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {loading && <Loading />}

        {error && (
          <div className="mt-6">
            <Error message={error} />
          </div>
        )}

        {report && <ReportCard report={report} />}
      </div>
    </div>
  );
}

export default App;
