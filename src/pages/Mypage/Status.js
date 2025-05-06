import React from "react";
import "../../styles/Mypage.css"; // 스타일 파일 그대로 사용한다면

const Status = () => {

  console.log("✅ Status 컴포넌트 렌더링됨");

  const orderStatus = {
    paymentDone: 1,
    shipping: 10,
    shipped: 100,
    canceled: 0,
  };

  return (
  <div className="status-container">
    <div className="status-title">나의 주문 현황</div>
    <div className="status-line" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
      <div className="status-item">
        <div className="status-label">입금완료</div>
        <div className="status-value">{orderStatus.paymentDone}</div>
      </div>
      <div className="status-item">
        <div className="status-label">배송중</div>
        <div className="status-value">{orderStatus.shipping}</div>
      </div>
      <div className="status-item">
        <div className="status-label">배송완료</div>
        <div className="status-value">{orderStatus.shipped}</div>
      </div>
      <div className="status-item">
        <div className="status-label">주문취소</div>
        <div className="status-value">{orderStatus.canceled}</div>
      </div>
    </div>
  </div>
);

};

export default Status;
