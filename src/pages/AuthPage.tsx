// src/pages/AuthPage.tsx
import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  onAuthSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    alert("비밀번호 찾기 페이지로 이동합니다 (모달이 닫히고 새 페이지)");
    if (onAuthSuccess) {
      onAuthSuccess(); // 모달 닫기
    }
    navigate("/forgot-password"); // 실제 비밀번호 찾기 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center w-full min-h-100">
      {" "}
      {/* 모달 안에 들어갈 때 min-h 조정 */}
      {isLoginView ? (
        <LoginForm
          onSwitchToRegister={() => setIsLoginView(false)}
          onForgotPassword={handleForgotPassword}
          onAuthSuccess={onAuthSuccess}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLoginView(true)}
          onAuthSuccess={onAuthSuccess}
        />
      )}
    </div>
  );
};

export default AuthPage;
