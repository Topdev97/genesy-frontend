import { BsImage } from "react-icons/bs";
import { useFilePicker } from "use-file-picker";
import { useEffect, useState } from "react";
import { NFT_STORAGE_KEY } from "../utils/constants";
import { NFTStorage, File } from "nft.storage";
import { useTezosCollectStore } from "../store";

const Mint = () => {
  const { nftMint } = useTezosCollectStore();
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 2 },
    maxFileSize: 50, // in megabytes
  });
  useEffect(() => {
    console.log("filesContent", filesContent);
  }, [filesContent]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [royalties, setRoyalties] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const [base64image, setBase64image] = useState("");
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("hello", name, description, royalties, amount);
    if (
      name === "" ||
      description === "" ||
      royalties === "" ||
      amount === "" ||
      !/^-?\d+$/.test(amount) ||
      filesContent.length === 0
    ) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    (async () => {
      const metadata = await client.store({
        name: name,
        description: description,
        amount: "0",
        royalties: royalties,
        image: new File([filesContent[0].content], filesContent[0].name, {
          type: "image/" + filesContent[0].name.split(".")[1],
        }),
      });
      console.log("metadata", metadata);
      await nftMint(amount, metadata);
    })();
  };
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="text-3xl font-medium">Mint a new piece of art</div>
      <div className="flex flex-col py-4 gap-2">
        <div>TITLE*</div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="Title of your art piece"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>DESCRIPTION*</div>
        <textarea
          name="name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="Add a detailed description about this piece of art."
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>ROYALTIES*</div>
        <input
          type="text"
          name="name"
          value={royalties}
          onChange={(e) => setRoyalties(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="You can set a value between 0 and 10%"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>SELLING AMOUNT*</div>
        <input
          type="text"
          name="name"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="Define the selling amount for this item(XTZ)"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>UPLOAD ART</div>
        <div>
          <button
            className="border border-black text-3xl flex items-center justify-center p-8"
            onClick={(event) => {
              openFileSelector();
              event.preventDefault();
            }}
          >
            {filesContent.length > 0 ? (
              <div>
                {filesContent.map((file, index) => (
                  <div key={index}>
                    <img alt={file.name} src={file.content} />
                  </div>
                ))}
              </div>
            ) : (
              <BsImage />
            )}
          </button>
        </div>
      </div>
      <button
        className="w-28 py-2 bg-black text-white my-4"
        onClick={(e) => onSubmit(e)}
      >
        MINT
      </button>
    </div>
  );
};

export default Mint;
