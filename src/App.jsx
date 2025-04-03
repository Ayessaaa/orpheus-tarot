import { useEffect, useState } from "react";

function App() {
  const [isLogoDone, setIsLogoDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoDone(true);
    }, 4300);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);
  return (
    <div className="bg-gradient-to-b from-[#121031] from-50% to-[#3d2585] w-screen h-screen">
      <div className="h-100 absolute -top-30 -left-10 w-150 bg-blue-900/50 rounded-full blur-3xl"></div>
      <div className="pt-50">
        <img
          src="/imgs/logo1.png"
          className={`w-200 mx-auto animate__animated animate__slower ${
            isLogoDone
              ? "animate__pulse animate__infinite"
              : "animate__fadeInUp  animate__delay-1s"
          }`}
        />
      </div>

      <div className={`animate__animated animate__slower ${isLogoDone ? "animate__fadeIn" : "hidden" }  w-fit mx-auto border-4 border-[#FAD776] hover:scale-105 transition-all duration-300 hover:bg-[#d2b158] group mt-20  rounded-full p-1.5 shadow-lg shadow-[#F4EA90]/30`}>
        <button className=" text-[#F4EA90] px-5 py-1 pb-3  rounded-full text-3xl bg-[#F4EA90]/20 tracking-wide group-hover:text-white transition-all">
          What's my fortune?
        </button>
      </div>
    </div>
  );
}

export default App;
