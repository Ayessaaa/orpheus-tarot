import { useEffect, useState } from "react";

import axios from "axios";

const cardsObject = [
  {
    name: "hiding orpheus",
    number: "1",
  },
  {
    name: "heart eyes orpheus",
    number: "2",
  },
  {
    name: "are you serious (what the heck?) orpheus",
    number: "3",
  },
  {
    name: "hilariously laughing orpheus",
    number: "4",
  },
  {
    name: "disappointed orpheus",
    number: "5",
  },
  {
    name: "cursing orpheus",
    number: "6",
  },
  {
    name: "smiling orpheus",
    number: "7",
  },
];

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const prompt =
  "You are oracle orpheus for tarot reading. Orpheus is a dinosaur so hes kinda silly and dumb and will mispell things and will make you do stupid things. I ask this question to you as orpheus and got this 3 cards randomly: ";
const prompt2 =
  ", make up some kind of reading based of this and would you respond to the users question: ";
const prompt3 =
  ". make it straight to the point, orpheus doesn't care about me he is silly and dumb and might mispell things and not afraid to tell what he wants he speaks like a toddler. dont make it too long ";


const getOpenAIResponse = async (prompt) => {
  try {
    const response = await axios.post("/api/tarot", { prompt });
    return response.data;
  } catch (error) {
    console.error("Error from /api/tarot:", error);
    throw error;
  }
};


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
      <Logo logoAnimate={logoAnimate} img="logo2.png" width="w-80" pt="pt-10" />

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

function Button({
  isLogoDone,
  onButtonClick,
  textSize = "text-3xl",
  mt = "mt-20",
  children,
}) {
  return (
    <div
      className={`animate__animated animate__slower  ${
        isLogoDone ? "animate__fadeIn" : "invisible"
      }  w-fit mx-auto border-4 border-[#FAD776] hover:scale-105 transition-all duration-300 hover:bg-[#d2b158] group ${mt}  rounded-full p-1.5 shadow-lg shadow-[#F4EA90]/30`}
    >
      <button
        onClick={onButtonClick}
        className={` text-[#F4EA90] px-5 py-1 pb-3 cursor-pointer  rounded-full ${textSize} bg-[#F4EA90]/20 tracking-wide group-hover:text-white transition-all`}
      >
        {children}
      </button>
    </div>
  );
}

function Input({ children }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isShowButton, setIsShowButton] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);

  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");

  const [cardClicked, setCardClicked] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    setCardClicked(true);

    setIsFadeOut(true);
    setIsFadeIn(false);

    setTimeout(async () => {
      const c1 = cardsObject[Math.floor(Math.random() * 7)];
      const c2 = cardsObject[Math.floor(Math.random() * 7)];
      const c3 = cardsObject[Math.floor(Math.random() * 7)];

      setCard1(c1);
      setCard2(c2);
      setCard3(c3);

      const aiResponse = await getOpenAIResponse(
        prompt +
          c1.name +
          " and " +
          c2.name +
          " and " +
          c3.name +
          prompt2 +
          question +
          prompt3
      );

      setResponse(aiResponse.choices[0].message.content);
      setIsFadeOut(false);
      setIsFadeIn(true);
    }, 500);
  }

  return (
    <form className="flex flex-col mt-15" onSubmit={handleSubmit}>
      <label className="z-20 text-3xl tracking-wide text-center text-[#9EB2FF] animate__animated animate__fadeIn animate__delay-1s">
        <span className=" text-shadow-lg text-shadow-[#9EB2FF]/20 flex gap-2 w-fit mx-auto">
          <img src="imgs/star.png" className="w-12" />
          What is your qwuestion for{" "}
          <span className="text-[#CEA1FF] text-shadow-lg text-shadow-[#CEA1FF]/20">
            oracle orpheus?
          </span>
        </span>
      </label>
      <input
        className="focus:outline-0 active:outline-0 focus:bg-[#CEA1FF]/15 focus:outline-[#d2b158] transition-all animate__animated animate__fadeIn animate__delay-2s z-20  text-2xl text-center w-220 mx-auto border-double border-[#9EB2FF]/50 bg-[#9EB2FF]/10 rounded-2xl h-18 mt-10"
        type="text"
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          setIsShowButton(true);
        }}
      ></input>

      <Button
        isLogoDone={isShowButton}
        textSize="text-xl"
        mt="mt-14"
      >
        Draw Cards
      </Button>
      <Orpheus
        card1={card1}
        card2={card2}
        card3={card3}
        cardClicked={cardClicked}
        setCardClicked={setCardClicked}
      />
      <p
  className={`mx-auto w-220 text-center text-base mt-15 animate__animated mb-15 ${
    isFadeOut ? "animate__fadeOut" : isFadeIn ? "animate__fadeIn animate__delay-5s" : ""
  }`}
>
  {response}
</p>
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

function Orpheus({ card1, card2, card3, cardClicked, setCardClicked }) {
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [c3, setC3] = useState("");

  useEffect(() => {
    if (cardClicked) {
      const timer = setTimeout(() => {
        setC1(card1);
        setC2(card2);
        setC3(card3);
        setCardClicked(false);
        console.log("trueee");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cardClicked, setCardClicked, card1, card2, card3]);
  return (
    <div className="flex w-fit mx-auto">
      <img
        src="imgs/orpheus.png"
        className={`h-60 mx-auto mt-20 animate__animated  `}
      />
      <Card
        card={c1 !== "" ? c1 : { number: "cover" }}
        cardClicked={cardClicked}
      />
      <Card
        card={c2 !== "" ? c2 : { number: "cover" }}
        cardClicked={cardClicked}
        delay="animate__delay-1s"
      />
      <Card
        card={c3 !== "" ? c3 : { number: "cover" }}
        cardClicked={cardClicked}
        delay="animate__delay-2s"
      />
    </div>
  );
}

function Card({ card = { number: "cover" }, cardClicked, delay = "" }) {
  return (
    <img
      src={`imgs/${card.number}.png`}
      className={`h-60 mx-auto mt-15 animate__animated  ${
        cardClicked ? "animate__fadeOut" : "animate__fadeIn"
      } ${delay} `}
    />
  );
}

export default App;
