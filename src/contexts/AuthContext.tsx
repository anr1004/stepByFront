import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

// AuthProvider 컴포넌트의 props 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null); // 사용자 정보
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const navigate = useNavigate();

  // 초기 로딩 시 localStorage에서 토큰 및 사용자 정보 로드
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user"); // 사용자 정보 JSON 문자열

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser)); // JSON 파싱하여 UserInfo 객체로 변환
        setIsLoggedIn(true);
      }
    } catch (error) {
      // localStorage 로딩 중 오류 발생 시 (예: 유효하지 않은 JSON)
      console.error("Failed to load auth state from localStorage", error);
      setIsLoggedIn(false);
      setUser(null);
      // 잘못된 정보가 있으면 localStorage에서 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, []); // 최초 마운트 시 한 번만 실행

  // 로그인 처리 함수
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }

      const data = await response.json();
      const { accessToken, userId, email: userEmail, role } = data;

      //상태 업데이트
      setAccessToken(accessToken);
      const authUser: IAuthUser = { userId, email: userEmail, role };
      setUser(authUser);
      setIsLoggedIn(true);

      // localStorage에 토큰과 사용자 정보 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(authUser));

      console.log("로그인 성공 :", authUser);
      return true;
    } catch (error: any) {
      console.error("로그인 중 에러 발생", error.message);
      alert(error.message);
      return false;
    }
  };

  //회원가입 처리 함수
  const register = async (data: IRegisterData): Promise<string> => {
    try {
      const response = await apiClient.post(
        "http://localhost:8080/api/auth/register",
        data
      );

      const responseData = response.data;

      console.log("회원가입 성공 :", responseData);
      return responseData.message || "회원가입에 성공하였습니다.";
    } catch (error: any) {
      console.error(
        "회원가입 중 에러 발생 :",
        error.reponse?.data?.message || error.message
      );
      let errorMessage =
        error.response?.data?.message ||
        error.message ||
        "회원가입 중 알 수 없는 오류가 발생했습니다.";
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        errorMessage +=
          "\n" +
          error.response.data.errors
            .map((err: any) => err.defaultMessage || err.message)
            .join("\n");
      }
      alert(errorMessage);
      return error.message;
    }
  };

  // 로그아웃 처리 함수
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken"); // 토큰 제거
    localStorage.removeItem("user"); // 사용자 정보 제거
    navigate("/");
    console.log("로그아웃 되었습니다.");
  };

  // Context를 통해 제공할 값들을 묶음
  const value = {
    user,
    accessToken,
    isLoggedIn,
    login,
    register,
    logout,
  };

  // Provider를 통해 자식 컴포넌트들에게 value를 제공
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
