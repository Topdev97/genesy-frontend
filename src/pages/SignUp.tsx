import spinner from "../assets/spinner.svg";
import { ChangeEvent, useState, useEffect } from "react";
import ImageDropZone from "../components/ImageDropZone";
import { pinToIpfs } from "../utils/utils";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useTezosCollectStore } from "../store";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [feed, setFeed] = useState<string>("0");
  const [base64image, setBase64image] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [imageObject, setImageObject] = useState<File | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setFeed(e.target.value);
  };
  const { activeAddress } = useTezosCollectStore();
  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    console.log("file", file);
    const reader = new FileReader();
    reader.onload = function (event) {
      setBase64image(event.target!.result!.toString());
    };
    reader.readAsDataURL(file);
  }

  const saveProfile = async () => {
    if (imageObject) {
      try {
        setIsLoad(true);
        const cid = await pinToIpfs(imageObject);
        setProfile(`https://${cid}.ipfs.nftstorage.link`);
        let payload = {
          username: name,
          description: description,
          feedOrder: feed,
          avatarLink: `https://${cid}.ipfs.nftstorage.link`,
          twitter: twitter,
        };
        let res = await axios.put(
          `${API_ENDPOINT}/profiles/${activeAddress}`,
          payload
        );
        console.log("res", res);
        navigate("/home/primary");
        setIsLoad(false);
      } catch (error) {
        console.log(error);
        setIsLoad(false);
      }
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="w-96 flex flex-col">
        <div className="text-3xl">Create a Genesy account</div>
        <div className="py-6">
          You are almost there... Enter the information related to your account.
          You can always edit it later.
        </div>
        <div className="flex flex-col py-4">
          <div>USERNAME*</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-b border-black"
            placeholder="Choose the username that will appear on your profile"
          />
        </div>
        <div className="flex flex-col py-4">
          <div>DESCRIPTION*</div>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border-b border-black"
            placeholder="Write a few words about who you are"
          />
        </div>
        <div className="flex flex-col py-4">
          <div>TWITTER ACCOUNT*</div>
          <input
            type="text"
            name="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="outline-none border-b border-black"
            placeholder="Write your Twitter username"
          />
        </div>
        <div className="py-4">
          <div>FEED ORDER*</div>
          <div>
            <div>
              <input
                type="radio"
                name="feed"
                defaultChecked
                id="chronological"
                value="0"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="chronological" className="pl-1">
                Chronological
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="feed"
                id="curated"
                value="1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="curated" className="pl-1">
                Curated
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 gap-2">
          <div>FEED ORDER*</div>
          <div className="flex">
            <ImageDropZone
              imageObject={imageObject}
              setImageObject={setImageObject}
            />
          </div>
        </div>
        <button
          className="py-2 bg-black text-white w-32  my-4 hover:bg-gray-600"
          onClick={() => saveProfile()}
        >
          {isLoad ? (
            <div className="flex items-center justify-center">
              <img
                src={spinner}
                alt="spinner"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
              />
              SAVING...
            </div>
          ) : (
            <div>SAVE</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
