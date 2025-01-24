import { Button } from "../components/Button";
import { InputBox } from "../components/Inputbox";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="max-w-2xl mx-auto py-16 px-4 space-y-6">
        <h1 className="text-5xl text-white font-bold tracking-tight leading-none md:text-6xl md:tracking-tighter md:leading-snug">
          Welcome to my website
        </h1>
        <p className="text-xl text-gray-200">
          This is a basic React app with Tailwind CSS and React Router. It's a
          great starting point for your next project.
        </p>
        <Button
          variant="primary"
          onClick={() => {
            setTimeout(() => {
              navigate("/playground");
            }, 500);
          }}
        >
          Go to Playground
        </Button>
      </div>

      {/* <InputBox placeholder="Enter your name" /> */}
    </div>
  );
};

