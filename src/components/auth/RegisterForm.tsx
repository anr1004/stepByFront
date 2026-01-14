// src/components/auth/RegisterForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

declare global {
  interface Window {
    daum: any;
  }
}

interface RegisterFormProps {
  onSwitchToLogin: () => void; // 로그인 페이지로 전환하는 함수
  onAuthSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onAuthSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [realName, setRealName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [zonecode, setZonecode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 기본 주소 (도로명 또는 지번)
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 (동/호수 등)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();

  const validateBirthDate = (dateString: string): string | null => {
    if (!dateString) return "생년월일을 선택해주세요.";
    const today = new Date();
    const birth = new Date(dateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 14) {
      // 최소 나이 제한 예시
      return "만 14세 이상만 회원가입할 수 있습니다.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. 클라이언트 측 유효성 검사 (기본)
    if (!email.trim() || !email.includes("@")) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!realName.trim()) {
      setError("실명을 입력해주세요.");
      return;
    }
    const birthDateError = validateBirthDate(birthDate);
    if (birthDateError) {
      setError(birthDateError);
      return;
    }
    if (!gender) {
      setError("성별을 선택해주세요.");
      return;
    }
    if (!phoneNumber.trim() || !/^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      setError("유효한 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)");
      return;
    }
    if (!zonecode.trim() || !address.trim()) {
      setError("주소 검색을 통해 주소를 입력해주세요.");
      return;
    }
    if (!detailAddress.trim()) {
      setError("상세 주소를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const registerData: IRegisterData = {
        email,
        password,
        realName,
        birthDate,
        gender,
        phoneNumber,
        zonecode,
        address,
        detailAddress,
      };

      const message = await register(registerData);

      if (message.includes("성공")) {
        alert(message);
        onSwitchToLogin();
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      } else {
        setError(message);
      }
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          // 검색 결과 처리 로직
          let addr = ""; // 주소 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 지번 주소를 선택했을 경우(userSelectedType: 'J')
            addr = data.jibunAddress;
          }

          // 우편번호와 기본 주소 설정
          setZonecode(data.zonecode);
          setAddress(addr);
          setDetailAddress(""); // 상세 주소는 초기화 후 사용자가 직접 입력하도록
        },
      }).open();
    } else {
      alert(
        "다음 우편번호 서비스 스크립트가 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-900">회원가입</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <fieldset className="space-y-4 border p-4 rounded-md">
          <legend className="text-lg font-semibold text-gray-800">
            계정 정보
          </legend>

          <div>
            <label
              htmlFor="registerEmail"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="registerEmail"
              name="registerEmail"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="registerPassword"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="registerPassword"
              name="registerPassword"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4 border p-4 rounded-md">
          <legend className="text-lg font-semibold text-gray-800">
            개인 정보
          </legend>
          <div>
            <label
              htmlFor="realName"
              className="block text-sm font-medium text-gray-700"
            >
              실명
            </label>
            <input
              id="realName"
              name="realName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              placeholder="실명을 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              생년월일
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date" // 날짜 선택 UI 제공
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              성별
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="unknown">선택 안 함</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="zonecode"
              className="block text-sm font-medium text-gray-700"
            >
              우편번호
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="zonecode"
                name="zonecode"
                type="text"
                readOnly // 사용자가 직접 수정하지 못하도록 readOnly
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                value={zonecode}
                placeholder="우편번호"
              />
              <button
                type="button"
                onClick={handleAddressSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
              >
                주소 검색
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              기본 주소
            </label>
            <input
              id="address"
              name="address"
              type="text"
              readOnly // 사용자가 직접 수정하지 못하도록 readOnly
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
              value={address}
              placeholder="주소 검색을 클릭하여 입력해주세요."
            />
          </div>
          <div>
            <label
              htmlFor="detailAddress"
              className="block text-sm font-medium text-gray-700"
            >
              상세 주소
            </label>
            <input
              id="detailAddress"
              name="detailAddress"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="동/호수, 상세 건물명 등을 입력하세요."
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              휴대폰 번호
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel" // 전화번호 타입 (모바일에서 키보드 최적화)
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={phoneNumber}
              onChange={(e) => {
                // 숫자와 하이픈만 허용하도록 필터링 (선택 사항)
                const formattedNumber = e.target.value.replace(/[^0-9-]/g, "");
                setPhoneNumber(formattedNumber);
              }}
              placeholder="예: 010-1234-5678"
            />
          </div>
        </fieldset>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600 mt-4">
        이미 회원이신가요?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          로그인
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
