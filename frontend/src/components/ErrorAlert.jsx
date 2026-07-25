import { AlertTriangle } from "lucide-react";

function ErrorAlert({ message }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
}

export default ErrorAlert;
