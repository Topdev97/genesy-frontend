import ConnectWallet from "./ConnectWallet";
// import { useTheme } from "../../context";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Navbar = () => {
  // const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center py-12 max-w-[1024px] mx-auto sm:px-8 lg:px-0">
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
        <div className="text-3xl border-r-8 border-black pr-4 ">GENESY</div>
      </LinkWithSearchParams>
      <div className="">
        {/* <button className="rounded-full text-3xl h-12 w-12 hover:bg-gray-200 flex justify-center items-center">
          <SiMarketo />
        </button> */}
        {/* <button
          className="rounded-full text-3xl h-12 w-12 hover:bg-gray-200 flex justify-center items-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <AiOutlineSetting /> : <FaMoon />}
        </button> */}
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
