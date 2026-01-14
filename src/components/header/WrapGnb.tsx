import { Link } from "react-router-dom";

const WrapGnb: React.FC = () => {
  return (
    <div className="wrap-gnb">
      <nav>
        <ul className="flex space-x-8 font-bold">
          <li>
            <Link to="/best" className="hover:text-blue-500">
              베스트
            </Link>
          </li>
          <li>
            <Link to="/newItem" className="hover:text-blue-500">
              신상품
            </Link>
          </li>
          <li>
            <Link to="/kids" className="hover:text-blue-500">
              키즈
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WrapGnb;
