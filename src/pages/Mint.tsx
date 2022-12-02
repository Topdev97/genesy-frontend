import { BsImage } from "react-icons/bs";

const Mint = () => {
  return (
    <div className="max-w-[1024px] mx-auto py-24">
      <div className="text-3xl font-medium">Mint a new piece of art</div>
      <div className="flex flex-col py-4 gap-2">
        <div>TITLE*</div>
        <input
          type="text"
          name="name"
          className="outline-none border-b border-black"
          placeholder="Title of your art piece"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>DESCRIPTION*</div>
        <textarea
          name="name"
          className="outline-none border-b border-black"
          placeholder="Add a detailed description about this piece of art."
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>ROYALTIES*</div>
        <input
          type="text"
          name="name"
          className="outline-none border-b border-black"
          placeholder="You can set a value between 0 and 10%"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>SELLING AMOUNT*</div>
        <input
          type="text"
          name="name"
          className="outline-none border-b border-black"
          placeholder="Define the selling amount for this item(XTZ)"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>UPLOAD ART</div>
        <div className="w-32 h-32 border border-black text-3xl flex items-center justify-center">
          <BsImage />
        </div>
      </div>
      <button className="w-28 py-2 bg-black text-white my-4">MINT</button>
    </div>
  );
};

export default Mint;
