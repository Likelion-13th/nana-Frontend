// src/pages/Mypage/Mypage.jsx (또는 기존 위치 그대로 사용)
import React, { useState, useEffect } from "react";
import "../../styles/Mypage.css";
import Profile from "./Profile";
import Status from "./Status";
import Address from "./Address";
import History from "./History";
import axios from "axios";
import { useCookies } from "react-cookie";

const Mypage = () => {
  const [cookies] = useCookies(["accessToken"]);

  const [profileData, setProfileData] = useState({});
  const [orderStatusData, setOrderStatusData] = useState({});
  const [historyData, setHistoryData] = useState([]); // ✅ 새로 추가

  const handleSave = async (zipcode, address, addressDetail) => {
    try {
      const response = await axios.post(
        "/users/address",
        {
          zipcode: zipcode,
          address: address,
          addressDetail: addressDetail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        alert("주소가 성공적으로 저장되었습니다.");
      } else {
        alert(`주소 저장 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error("주소 저장 오류:", error);
      alert("주소 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!cookies.accessToken) return;

    const fetchMypageData = async () => {
      try {
        // ✅ 프로필 + 주문 목록 동시에 가져오기
        const [profileRes, ordersRes] = await Promise.all([
          axios.get("/users/profile", {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }),
          axios.get("/orders", {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }),
        ]);

        // 프로필 / 상태 데이터
        const profile = profileRes.data.result;
        setProfileData({
          usernickname: profile.usernickname,
          recentTotal: profile.recentTotal,
          maxMileage: profile.maxMileage,
        });
        setOrderStatusData(profile.orderStatusCounts);

        // 히스토리 데이터
        setHistoryData(ordersRes.data.result || []);
      } catch (err) {
        console.log("마이페이지 데이터 API 요청 실패:", err);
      }
    };

    fetchMypageData();
  }, [cookies.accessToken]);

  // ✅ 주문 취소 핸들러
  const handleCancelOrder = async (orderId) => {
    const ok = window.confirm("정말 이 주문을 취소하시겠습니까?");
    if (!ok) return;

    try {
      const res = await axios.put(
        `/orders/${orderId}/cancel`,
        null,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );

      if (res.data.isSuccess) {
        alert("주문이 취소되었습니다.");

        // 화면에서 상태만 CANCEL로 변경
        setHistoryData((prev) =>
          prev.map((order) =>
            order.orderId === orderId
              ? { ...order, status: "CANCEL" }
              : order
          )
        );
      } else {
        alert(`주문 취소 실패: ${res.data.message}`);
      }
    } catch (error) {
      console.error("주문 취소 오류:", error);
      alert("주문 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page-container">
      <Profile profileData={profileData} />
      <Status orderStatusData={orderStatusData} />
      <Address handleSave={handleSave} />
      <History historyData={historyData} onCancel={handleCancelOrder} />
    </div>
  );
};

export default Mypage;
