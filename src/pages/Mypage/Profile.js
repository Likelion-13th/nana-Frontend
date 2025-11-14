import React from "react";

const Profile = ({ profileData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };
  return (
    <div className="profile-container">
        <div className="profile-section">
            <div className="profile-name">
	            <span className="profile-realName">
                {profileData?.usernickname ?? ""}
              </span>님
	          </div>
            <div className="profile-membership">[VVIP]회원</div>
        </div>
        <div className="profile-section">
            <div className="profile-stat-label">총 결제 금액</div>
            <div className="profile-stat-value">
	            <span>{formatCurrency(profileData?.recentTotal)}</span>
			        원
			      </div>
        </div>
        <div className="profile-section">
            <div className="profile-stat-label">마일리지</div>
            <div className="profile-stat-value">
	            <span>{formatCurrency(profileData?.maxMileage)}</span>
	            원
		        </div>
        </div>
    </div>
  );
};
export default Profile;
