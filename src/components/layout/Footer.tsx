import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-[#ececec] text-[#767676] py-8 sm:px-6 lg:px8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* 정책 및 정보 링크 섹션 */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-sm">
          <Link
            to="/terms-of-service"
            className="hover:text-black transition-colors duration-200"
          >
            서비스 약관/정책
          </Link>
          <Link
            to="/legal-info"
            className="hover:text-black transition-colors duration-200"
          >
            법률 정보
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-black transition-colors duration-200"
          >
            개인정보 처리방침
          </Link>
          <Link
            to="/cookie-policy"
            className="hover:text-black transition-colors duration-200"
          >
            쿠키 정책
          </Link>
        </nav>

        {/* 저작권 표시 섹션 */}
        <div className="pt-6 text-center text-sm">
          <p>Copyright © {currentYear} Soboom All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
