import { Globe, Loader2 } from "lucide-react";

function URLInput({ url, setUrl, onAnalyze, loading, error }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      onAnalyze();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Globe
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
          />
        </div>

        <button
          onClick={onAnalyze}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Analyzing" : "Analyze"}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default URLInput;
