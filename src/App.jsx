import { use, useEffect, useState } from "react";

function App() {
  const [isLanding, setIsLanding] = useState(true);
  return (
    <div className="bg-gradient-to-b from-[#121031] from-50% to-[#3d2585] w-screen h-screen">
      <div className="h-100 absolute -top-30 -left-10 w-150 bg-blue-900/50 rounded-full blur-3xl z-0"></div>
      {isLanding ? <Landing setIsLanding={setIsLanding} /> : <PromptPage />}
    </div>
  );
}

function Landing({ setIsLanding }) {
  const [isLogoDone, setIsLogoDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const logoAnimate = isLogoDone
    ? "animate__pulse animate__infinite"
    : "animate__fadeInUp  animate__delay-1s";

  const handleClick = () => {
    setIsFadingOut(true);
    setTimeout(() => setIsLanding(false), 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoDone(true);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);
  return (
    <PageDiv isFadingOut={isFadingOut}>
      <Logo logoAnimate={logoAnimate} img="logo1.png" />
      <Button isLogoDone={isLogoDone} onButtonClick={handleClick}>
        What's my fortune?
      </Button>
    </PageDiv>
  );
}

function PromptPage() {
  const [isLogoDone, setIsLogoDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoDone(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimate = isLogoDone
    ? "animate__pulse animate__infinite"
    : "animate__fadeIn  ";

  return (
    <PageDiv>
      <Logo
        logoAnimate={logoAnimate}
        img="logo2.png"
        width="w-100"
        pt="pt-10"
      />

      <Input></Input>
    </PageDiv>
  );
}

function Logo({ logoAnimate, img, width = "w-200", pt = "pt-50" }) {
  return (
    <div className={pt}>
      <img
        src={`/imgs/${img}`}
        className={`${width} mx-auto animate__animated animate__slower ${logoAnimate}`}
      />
    </div>
  );
}

function Button({ isLogoDone, onButtonClick, children }) {
  return (
    <div
      className={`animate__animated animate__slower  ${
        isLogoDone ? "animate__fadeIn" : "hidden"
      }  w-fit mx-auto border-4 border-[#FAD776] hover:scale-105 transition-all duration-300 hover:bg-[#d2b158] group mt-20  rounded-full p-1.5 shadow-lg shadow-[#F4EA90]/30`}
    >
      <button
        onClick={onButtonClick}
        className=" text-[#F4EA90] px-5 py-1 pb-3 cursor-pointer  rounded-full text-3xl bg-[#F4EA90]/20 tracking-wide group-hover:text-white transition-all"
      >
        {children}
      </button>
    </div>
  );
}

function Input({ children }) {
  const [question, setQuestion] = useState("");
  const [isShowButton, setIsShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClick = () => {
    setIsFadingOut(true);
  };

  return (
    <form className="flex flex-col mt-20">
      <label className="z-20 text-4xl tracking-wide text-center text-[#9EB2FF] animate__animated animate__fadeIn animate__delay-1s">
        <span className=" text-shadow-lg text-shadow-[#9EB2FF]/20">
          What is your qwuestion for <span className="text-[#CEA1FF] text-shadow-lg text-shadow-[#CEA1FF]/20">oracle orpheus?</span>
        </span>
      </label>
      <input
        className="focus:outline-2 focus:outline-[#9EB2FF] transition-all animate__animated animate__fadeIn animate__delay-2s z-20 border-4 text-3xl text-center w-250 mx-auto border-double border-[#9EB2FF]/50 bg-[#9EB2FF]/10 rounded-2xl h-20 mt-10"
        type="text"
        value={question}
        onChange={(e) => {setQuestion(e.target.value); setIsShowButton(true)}}
      ></input>

      <Button isLogoDone={isShowButton} onButtonClick={handleClick}>
        What's my fortune?
      </Button>
    </form>
  );
}

function PageDiv({ isFadingOut, children }) {
  return (
    <div
      className={`animate__animated ${
        isFadingOut ? "animate__fadeOut" : "animate__fadeIn"
      }`}
    >
      {children}
    </div>
  );
}


export default App;
