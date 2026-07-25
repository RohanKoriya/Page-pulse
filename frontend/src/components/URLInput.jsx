function URLInput({ url, setUrl, onAnalyze, loading }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Enter website URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default URLInput;
