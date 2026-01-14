import { Link } from "react-router-dom";
import Icon from "./Icon";

interface LogoProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Tailwind Css 유틸리티 클래스 전달용
}

const Logo: React.FC<LogoProps> = ({
  src,
  alt = "",
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <Link to="/" className={`block ${className || ""}`}>
      <Icon src={src} alt={alt} width={width} height={height} />
    </Link>
  );
};

export default Logo;
