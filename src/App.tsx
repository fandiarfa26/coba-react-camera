import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => navigate("/camera")}
      >
        Open Camera
      </button>
    </div>
  );
}

export default App;
