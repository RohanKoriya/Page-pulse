import { useState } from "react";
import {
  Activity,
  Zap,
  Heading,
  Image,
  ImageOff,
  FileText,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

function getStatusColor(status) {
  if (status >= 200 && status < 300)
    return "text-green-700 bg-green-50 border-green-200";
  if (status >= 300 && status < 400)
    return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function getResponseColor(ms) {
  if (ms < 300) return "text-green-700 bg-green-50 border-green-200";
  if (ms <= 1000) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function getFavicon(url) {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}

function ReportCard({ report, url }) {
  const [copied, setCopied] = useState(false);
  const favicon = getFavicon(url);

  const copyReport = async () => {
    const reportText = `Page Pulse report for ${url}\nHTTP Status: ${report.status}\nResponse Time: ${report.responseTime} ms\nTitle: ${report.title || "No title"}\nMeta Description: ${report.metaDescription || "No meta description"}`;

    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {favicon && (
            <img
              src={favicon}
              alt="favicon"
              className="h-8 w-8 rounded-md border border-slate-200"
            />
          )}
          <div>
            <p className="font-medium text-slate-900">{url}</p>
            <p className="text-xs text-slate-400">
              Response time {report.responseTime} ms
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <ExternalLink size={14} /> Open
          </a>
          <button
            onClick={copyReport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div
          className={`rounded-xl border p-4 ${getStatusColor(report.status)}`}
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <Activity size={16} /> HTTP Status
          </div>
          <p className="mt-2 text-2xl font-semibold">{report.status}</p>
        </div>

        <div
          className={`rounded-xl border p-4 ${getResponseColor(report.responseTime)}`}
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <Zap size={16} /> Response Time
          </div>
          <p className="mt-2 text-2xl font-semibold">
            {report.responseTime} ms
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <Heading size={16} /> H1 Count
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {report.h1Count}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <Image size={16} /> Images
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {report.imageCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <ImageOff size={16} /> Missing Alt
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {report.missingAltImages}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
            <FileText size={16} /> Word Count
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {report.wordCount}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-700">
            Title{" "}
            <span className="font-normal text-slate-400">
              ({report.title?.length || 0} chars)
            </span>
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {report.title || "No title found"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-700">
            Meta Description{" "}
            <span className="font-normal text-slate-400">
              ({report.metaDescription?.length || 0} chars)
            </span>
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {report.metaDescription || "No meta description found"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
