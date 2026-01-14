import { Link } from "react-router-dom";
import NavMenu from "../header/NavMenu";
import WrapGnb from "../header/WrapGnb";
import SearchInputSection from "../search/SearchInputSection";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex flex-col relative z-30">
      <div className=" flex justify-between items-center px-28">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StepBy
        </Link>
        <NavMenu />
      </div>
      <div className="mt-5 flex justify-center">
        <WrapGnb />
      </div>
      <SearchInputSection />
    </header>
  );
};

export default Header;
