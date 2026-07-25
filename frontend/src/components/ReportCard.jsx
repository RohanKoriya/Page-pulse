function ReportCard({ report }) {
  return (
    <div className="rounded-xl bg-white shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Audit Report</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard label="HTTP Status" value={report.status} />

        <InfoCard label="Response Time" value={`${report.responseTime} ms`} />

        <InfoCard label="H1 Count" value={report.h1Count} />

        <InfoCard label="Images" value={report.imageCount} />

        <InfoCard label="Missing Alt" value={report.missingAltImages} />

        <InfoCard label="Word Count" value={report.wordCount} />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Title</h3>

        <p className="text-gray-700 mt-1">{report.title}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Meta Description</h3>

        <p className="text-gray-700 mt-1">{report.metaDescription}</p>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-100 p-4">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default ReportCard;
