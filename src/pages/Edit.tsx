import { BsImage } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

const Edit = () => {
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="w-96 flex flex-col">
        <div className="text-3xl">Edit profile</div>
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
              <label htmlFor="chronological" className="pl-1">
                Chronological
              </label>
            </div>
            <div>
              <input type="radio" name="feed" id="curated" />
              <label htmlFor="curated" className="pl-1">
                Curated
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-12  py-4">
          <div>
            <div className="pb-2">PROFILE IMAGE</div>
            <div className="border border-black w-10 h-10 flex justify-center items-center text-xl">
              <BsImage />
            </div>
          </div>
          <div>
            <div className="pb-2">TWITTER ACCOUNT</div>
            <div className="border border-black w-10 h-10 flex justify-center items-center text-xl">
              <FiTwitter />
            </div>
          </div>
        </div>

        <button className="py-2 bg-black text-white w-24  my-4">UPDATE</button>
      </div>
    </div>
  );
};

export default Edit;
