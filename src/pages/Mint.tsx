import { BsImage } from "react-icons/bs";
import { useState, ChangeEvent, useEffect } from "react";
import { NFT_STORAGE_KEY } from "../utils/constants";
import { NFTStorage, File } from "nft.storage";
import { useTezosCollectStore } from "../store";
import spinner from "../assets/spinner.svg";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { I_NFT, I_Log, I_PROFILE } from "../utils/interface";
import { replaceIpfsLink } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Mint = () => {
  const navigate = useNavigate();
  const {
    activeAddress,
    nftMint,
    lastTokenId,
    updateLastTokenId,
    fetchProfile,
  } = useTezosCollectStore();
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  const [profile, setProfile] = useState<I_PROFILE | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [royalties, setRoyalties] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [base64image, setBase64image] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoad(true);
    if (
      name === "" ||
      description === "" ||
      parseInt(royalties) > 15 ||
      parseInt(royalties) < 0 ||
      !/^-?\d+$/.test(royalties) ||
      file === null
    ) {
      setError("Some Error Occurred. Please check entered details.");
      return;
    }
    (async () => {
      try {
        const metadata = await client.store({
          name: name,
          description: description,
          image: new File([file!], file!.name, { type: file!.type }),
          symbol: "GENESY",
          decimals: 0,
          shouldPreferSymbol: false,
          isBooleanAmount: true,
          istransferable: true,
          artifactUri: new File([file!], file!.name, { type: file!.type }),
          displayUri: new File([file!], file!.name, { type: file!.type }),
          thumbnailUri: new File([file!], file!.name, { type: file!.type }),
          creators: ["genesy"],
        });
        let payload: I_NFT = {
          name: name,
          description: description,
          imageLink: replaceIpfsLink(metadata.data.image.href),
          artist: activeAddress,
          owner: activeAddress,
          price: amount,
          royalty: parseFloat(royalties),
          mintedAt: new Date(),
        };
        let logs: I_Log = {
          timestamp: new Date(),
          text: `${profile?.username} minted`,
        };
        let test = await nftMint(parseInt(royalties), metadata);
        console.log("test", test);
        await Promise.all([
          axios.put(`${API_ENDPOINT}/nfts/${lastTokenId}`, payload),
          axios.post(`${API_ENDPOINT}/nfts/log/${lastTokenId}`, logs),
          updateLastTokenId(),
        ]);
        setIsLoad(false);
        navigate(`/profile/${activeAddress}/owned`);
      } catch (error) {
        console.log(error);
        setIsLoad(false);
      }
    })();
  };

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    // console.log("file", file);
    setFile(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      setBase64image(event.target!.result!.toString());
    };
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetchProfile(activeAddress);
      setProfile(res);
      console.log("res", res);
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="text-3xl font-medium">Mint a new piece of art</div>
      <div className="flex flex-col py-4 gap-2 relative">
        <div>TITLE*</div>
        <input
          type="text"
          name="name"
          value={name}
          disabled={isLoad}
          onChange={(e) => setName(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="Title of your art piece"
        />
        {name.length > 30 ? (
          <div className="text-red-700 text-xs absolute top-[75px]">
            <p>The name must be less than 30 letters.</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col py-4 gap-2 relative">
        <div>DESCRIPTION*</div>
        <textarea
          name="name"
          value={description}
          disabled={isLoad}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="Add a detailed description about this piece of art."
        />
        {description.length > 300 ? (
          <div className="text-red-700 text-xs absolute top-[100px]">
            <p>The name must be less than 30 letters.</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>ROYALTIES*</div>
        <input
          type="text"
          name="name"
          value={royalties}
          disabled={isLoad}
          onChange={(e) => setRoyalties(e.target.value)}
          className="outline-none border-b border-black"
          placeholder="You can set a value between 0 and 15%"
        />
      </div>
      <div className="flex flex-col py-4 gap-2">
        <div>UPLOAD ART</div>
        <div className="flex">
          <label htmlFor="asset" className="">
            {base64image ? (
              <img
                className="rounded mt-4"
                width="350"
                src={base64image}
                alt="preview"
              />
            ) : (
              <div className="border border-black text-3xl flex items-center justify-center p-8">
                <BsImage />
              </div>
            )}
          </label>
          <input
            type="file"
            name="asset"
            id="asset"
            disabled={isLoad}
            className="invisible"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="relative">
        <button
          className="w-32 py-2 bg-black text-white my-4"
          onClick={(e) => onSubmit(e)}
        >
          {isLoad ? (
            <div className="flex items-center justify-center">
              <img
                src={spinner}
                alt="spinner"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
              />
              MINTING...
            </div>
          ) : (
            <div>MINT</div>
          )}
        </button>
        {error.length > 2 ? (
          <div className="text-red-700 text-xs absolute top-[60px]">
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Mint;
