import { BsImage } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

const SignUp = () => {
  return (
    <div className="max-w-[1024px] mx-auto py-24">
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
            className="outline-none border-b border-black"
            placeholder="Choose the username that will appear on your profile"
          />
        </div>
        <div className="flex flex-col py-4">
          <div>DESCRIPTION*</div>
          <input
            type="text"
            name="name"
            className="outline-none border-b border-black"
            placeholder="Write a few words about who you are"
          />
        </div>
        <div className="py-4">
          <div>FEED ORDER*</div>
          <div>
            <div>
              <input type="radio" name="feed" checked id="chronological" />
              <label htmlFor="chronological">Chronological</label>
            </div>
            <div>
              <input type="radio" name="feed" id="curated" />
              <label htmlFor="curated">Curated</label>
            </div>
          </div>
        </div>
        <div className="flex gap-12  py-4">
          <div>
            <div>PROFILE IMAGE</div>
            <div className="border border-black w-10 h-10 flex justify-center items-center text-xl">
              <BsImage />
            </div>
          </div>
          <div>
            <div>TWITTER ACCOUNT</div>
            <div className="border border-black w-10 h-10 flex justify-center items-center text-xl">
              <FiTwitter />
            </div>
          </div>
        </div>
        <button className="py-2 bg-black text-white w-24  my-4">SAVE</button>
      </div>
    </div>
  );
};

export default SignUp;
