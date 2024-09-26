const InputPaper = ({ image }: { image: string }) => {
  return (
    <div
      id="pictureIn"
      className="absolute left-1/2 -translate-x-1/2 max-w-[30vh] max-h-[25vh] w-full h-full"
    >
      <img alt="" className="w-full h-full object-cover" src={image} />
    </div>
  );
};

export { InputPaper };
