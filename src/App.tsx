import AddToDo from "./components/addtodo";
import Navbar from "./components/navbar";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10">
      <h1 className="text-[22px] mb-5 font-semibold">
        TODO REACT + TYPESCRIPT
      </h1>
      <Navbar />
      <AddToDo />
      <Todos />
    </div>
  );
}

export default App;
