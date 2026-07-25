import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="mt-8 flex flex-col items-center py-6 text-slate-500">
      <Loader2 size={24} className="animate-spin" />
      <p className="mt-3 text-sm">Analyzing website...</p>
    </div>
  );
}

export default Loading;
