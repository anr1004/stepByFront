import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../utils/apiClient";

// 마이페이지 상세 정보에 필요한 사용자 정보 인터페이스
interface UserDetail extends IAuthUser {
  realName: string;
  birthDate: string; // YYYY-MM-DD
  gender: string; // "MALE", "FEMALE", "OTHER"
  phoneNumber: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  createdAt: string;
  updatedAt: string;
}

const UserInfoPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      if (!isLoggedIn || !user) {
        setLoading(false);
        setError("로그인이 필요합니다.");
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get("/user/me");
        setUserDetail(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("내 정보 가져오기 실패:", err);
        setError(
          // err.response?.data?.message || "내 정보를 가져오는 데 실패했습니다."
          "서비스 생성 예정"
        );
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, [isLoggedIn, user]);

  if (loading) {
    return <div className="text-center text-xl">내 정보를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600">오류 발생: {error}</div>
    );
  }

  if (!userDetail) {
    return (
      <div className="text-center text-xl">사용자 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="p-4 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">개인 정보</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">이메일:</span>
          <span className="text-gray-900">{userDetail.email}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">실명:</span>
          <span className="text-gray-900">{userDetail.realName}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">생년월일:</span>
          <span className="text-gray-900">{userDetail.birthDate}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">성별:</span>
          <span className="text-gray-900">
            {userDetail.gender === "MALE"
              ? "남성"
              : userDetail.gender === "FEMALE"
              ? "여성"
              : "기타"}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">휴대폰 번호:</span>
          <span className="text-gray-900">{userDetail.phoneNumber}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">주소:</span>
          <span className="text-gray-900">{`(${userDetail.zonecode}) ${userDetail.address} ${userDetail.detailAddress}`}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">가입일:</span>
          <span className="text-gray-900">
            {new Date(userDetail.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* 필요한 경우 수정 버튼 추가 */}
        {/* <button className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">정보 수정</button> */}
      </div>
    </div>
  );
};

export default UserInfoPage;
