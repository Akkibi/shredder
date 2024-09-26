import { InputPaper } from "./components/InputPaper";
import { OutputPaper } from "./components/OutputPaper";
import { ChangeEvent, useRef } from "react";
import { useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const paper = { angle: 0 };
  const [angle, setAngle] = useState(0);
  const tl = useRef(gsap.timeline({ paused: true }));
  const [currentImage, setCurrentImage] = useState<string>("firby.jpg");

  useGSAP(() => {
    tl.current
      .set("#container", { clipPath: "inset(0px)" })
      .fromTo(
        "#title",
        { y: "0" },
        { y: "-50vh", duration: 1, ease: "back.in" }
      )
      .fromTo(
        ".instruction",
        { y: "0" },
        { y: "50vh", duration: 1, ease: "back.in" },
        "<"
      )
      .fromTo(
        "#container",
        { clipPath: "inset(0px)" },
        {
          clipPath: "inset(5px)",
          duration: 1,
          delay: 0.5,
          ease: "linear",
        },
        "<"
      )
      .fromTo(
        "#pictureIn",
        { top: "0%", y: "-100%" },
        { top: "100%", y: "-70%", duration: 2, ease: "sine.out" }
      )
      .to("#pictureIn", {
        top: "100%",
        y: "50%",
        duration: 2,
        ease: "linear",
      })
      .fromTo(
        "#picureOut",
        { top: "0%", y: "-110%" },
        { top: "0%", y: "-10%", duration: 2, ease: "linear" },
        "-=1.5"
      )
      .to("#picureOut", {
        top: "100%",
        y: "10%",
        duration: 2,
        ease: "sine.in",
      })
      .fromTo(
        paper,
        { angle: 0 },
        {
          angle: 180,
          duration: 2,
          ease: "sine.in",
          onUpdate: handleUpdate,
        },
        "<"
      )
      .fromTo(
        "#container",
        { clipPath: "inset(5px)" },
        {
          clipPath: "inset(0px)",
          duration: 1,
          ease: "linear",
        },
        ">"
      )
      .to("#title", { y: "0", duration: 1, ease: "back.out" }, "<")
      .to(
        ".instruction",
        { y: "0", duration: 1, ease: "back.out", stagger: 0.1 },
        "-=0.75"
      );
    tl.current.progress(0.01);
  });

  const start = () => {
    tl.current.progress(0);
    tl.current.play();
    paper.angle = 0;
    setAngle(0);
  };

  const handleUpdate = () => {
    setAngle(paper.angle);
  };

  return (
    <div
      className="flex justify-center items-center flex-col h-full w-full bg-black overflow-hidden max-h-full"
      id="container"
      style={{
        background: "linear-gradient(#000, #111)",
      }}
    >
      <div className=" h-full w-full relative overflow-clip">
        <div
          id="title"
          className="absolute z-50 top-1/2 left-1/2 flex justify-center items-center flex-col -translate-x-1/2 -translate-y-1/2 w-full"
        >
          <h1 className="text-4xl font-bold">Shred a picture</h1>
          <p>The only real way to get rid of a picture online</p>
        </div>
        <InputPaper image={currentImage} />
      </div>
      <div
        className="w-full z-50 max-w-[32vh] max-h-[20vh] h-full rounded-sm relative real-shadow"
        style={{
          backgroundImage:
            "linear-gradient(to right, #999 0%, #666 1%, #bbb 5% , #999 50%, #999 95%, #666 99%, #999 100%)",
        }}
      >
        <p className="absolute text-[#666] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
          SHREDDER
        </p>
      </div>
      <div className=" h-full w-full relative overflow-clip">
        <div className="max-w-[30vh] w-full h-3 left-1/2 -translate-x-1/2 absolute z-50">
          {[...Array(15 + 1)].map(
            (x, i) =>
              x == undefined && (
                <div
                  key={i}
                  className="h-full w-[2px] bg-white rounded-s-full absolute"
                  style={{
                    left: `${(i / 15) * 100}%`,
                    background: "linear-gradient(#555, #fff)",
                  }}
                ></div>
              )
          )}
        </div>
        <div className="absolute z-50 top-1/2 left-1/2 flex justify-center items-center flex-col -translate-x-1/2 -translate-y-1/2">
          <label htmlFor="picture" className="instruction text-center">
            <p>1. Select a picture</p>
          </label>
          <input
            className="max-w-min instruction"
            type="file"
            name="picture"
            accept=".jpg, .jpeg, .png"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                  setCurrentImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <div id="outerButton" className="instruction">
            <button
              id="button"
              className="text-xl break-keep min-w-max"
              onClick={start}
            >
              2. Shred it
            </button>
          </div>
        </div>
        <OutputPaper shredAmount={15} shredAngle={angle} image={currentImage} />
      </div>
      <p className="fixed bottom-2 right-2 text-sm opacity-50">
        © Akira Valade 2024
      </p>
    </div>
  );
}

export default App;
