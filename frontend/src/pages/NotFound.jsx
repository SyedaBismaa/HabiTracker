import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">Page not found</p>

      <Link
        to="/"
        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
