// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import SocialLoginButtons from "./SocialLoginButtons"; // 소셜 로그인 버튼 임포트
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormProps {
  onSwitchToRegister: () => void; // 회원가입 페이지로 전환하는 함수
  onForgotPassword: () => void; // 비밀번호 찾기 페이지로 이동하는 함수
  onAuthSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onForgotPassword,
  onAuthSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 클라이언트 측 유효성 검사 (기본)
    if (!email.trim()) {
      setError("아이디를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    const success = await login(email, password);
    if (success && onAuthSuccess) {
      onAuthSuccess();
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google 로그인 시작 (실제 SDK 호출)");
    // 실제 Google OAuth 인증 흐름 시작
  };

  const handleKakaoLogin = () => {
    console.log("Kakao 로그인 시작 (실제 SDK 호출)");
    // 실제 Kakao OAuth 인증 흐름 시작
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white ">
      <h2 className="text-3xl font-bold text-center text-gray-900">로그인</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </label>
          <input
            id="userId"
            name="userId"
            type="text"
            autoComplete="username"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <span className="text-gray-500">
                {showPassword ? "숨기기" : "보기"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          로그인
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            또는 소셜 계정으로 로그인
          </span>
        </div>
      </div>

      <SocialLoginButtons
        onGoogleLogin={handleGoogleLogin}
        onKakaoLogin={handleKakaoLogin}
      />

      <div className="text-center text-sm text-gray-600 mt-4">
        아직 회원이 아니신가요?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          회원가입
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
