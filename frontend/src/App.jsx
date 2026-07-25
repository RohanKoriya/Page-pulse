import { useState } from "react";
import URLInput from "./components/URLInput";
import Loading from "./components/Loading";
import ErrorAlert from "./components/ErrorAlert";
import ReportCard from "./components/ReportCard";
import Footer from "./components/Footer";
import api from "./services/api";

function isValidUrl(value) {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [scannedAt, setScannedAt] = useState(null);
  const [durationMs, setDurationMs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setInputError("Please enter a website URL.");
      return;
    }
    if (!isValidUrl(url)) {
      setInputError("Enter a full URL, e.g. https://example.com");
      return;
    }

    setInputError("");
    setLoading(true);
    setError("");
    setReport(null);

    const startedAt = performance.now();

    try {
      const response = await api.post("/analyze", { url });
      setReport(response.data.data);
      setScannedAt(new Date());
      setDurationMs(Math.round(performance.now() - startedAt));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Page Pulse
          </h1>
          <p className="mt-2 text-slate-500">
            Instant SEO and performance snapshots for any website.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <URLInput
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalyze}
            loading={loading}
            error={inputError}
          />

          {loading && <Loading />}
          {error && <ErrorAlert message={error} />}
          {!loading && report && (
            <ReportCard
              report={report}
              url={url}
              scannedAt={scannedAt}
              durationMs={durationMs}
            />
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
