function Error({ message }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4">
      <p className="text-red-700 font-medium">{message}</p>
    </div>
  );
}

export default Error;
