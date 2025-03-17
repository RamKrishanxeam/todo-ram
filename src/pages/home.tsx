import { useEffect } from "react";
import AddToDo from "../components/addtodo";
import Navbar from "../components/navbar";
import Todos from "../components/Todos";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user!);

  useEffect(() => {
    if (!userObj) {
      navigate("/login");
    }
  }, [userObj]);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center bg-gray-800 text-white p-5">
          <span>TODO</span>
          <span
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="cursor-pointer"
          >
            Logout
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center py-10">
          <h1 className="text-[22px] mb-5 font-semibold">
            TODO REACT + TYPESCRIPT
          </h1>
          <Navbar />
          <AddToDo />
          <Todos />
        </div>
      </div>
    </>
  );
}

export default Home;
