import { useState } from "react";
interface Stripe {
  zindex: number;
  top: number;
  leftOrRight: boolean;
  angle: number;
  origin: number;
}

const OutputPaper = ({
  shredAngle,
  shredAmount,
  image,
}: {
  shredAngle: number;
  shredAmount: number;
  image: string;
}) => {
  // console.log("angle : ", shredAngle);
  const [stripes, setStripes] = useState<Array<Stripe>>([]);

  if (stripes.length == 0) {
    for (let i = 0; i < shredAmount; i++) {
      setStripes((values) => [
        ...values,
        {
          zindex: Math.round(100 * Math.random()),
          top: Math.random() * 10,
          leftOrRight: Math.random() < 0.5 ? true : false,
          angle: Math.random() - 0.5,
          origin: Math.random() * 100,
        },
      ]);
    }
  } else {
    return (
      <div
        id="picureOut"
        className="absolute left-1/2 -translate-x-1/2 max-w-[30vh] max-h-[25vh] w-full h-full"
      >
        {[...Array(shredAmount)].map((x, i) => (
          <div
            className="absolute h-full"
            key={i}
            style={{
              filter: "drop-shadow(0 0 10px #000000dd)",
              transform: `rotate(${stripes[i].angle * shredAngle}deg)`,
              zIndex: stripes[i].zindex,
              left: `${(i / shredAmount) * 100}%`,
              top: stripes[i].top * (1 + shredAngle / 2),
              width: `${100 / shredAmount}%`,
              transformOrigin: `0% ${stripes[i].origin}%`,
            }}
          >
            <img
              style={{
                objectPosition: `${(i / shredAmount) * 100}% 0%`,
                clipPath: stripes[i].leftOrRight
                  ? "ellipse(100% 200% at 00% -50%)"
                  : "ellipse(100% 200% at 100% -50%)",
              }}
              src={image}
              alt=""
              className=" h-full object-cover origin-center w-full"
            />
          </div>
        ))}
      </div>
    );
  }
};

export { OutputPaper };
