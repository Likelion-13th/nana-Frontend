import React from "react";
import "../../styles/Mypage.css";

const Status = ({ orderStatusData }) => {
  const formatNumber = (amount) => {
    const safe = amount ?? 0;            // undefined/null이면 0
    return new Intl.NumberFormat("ko-KR").format(safe);
  };

  return (
    <div className="status-container">
      <div className="status-title">나의 주문 현황</div>
      <div className="status-line">
        <div className="status-item">
          <div className="status-label">배송중</div>
          <div className="status-value">
            {formatNumber(orderStatusData?.PROCESSING)}
          </div>
        </div>
        <div className="status-item">
          <div className="status-label">배송완료</div>
          <div className="status-value">
            {formatNumber(orderStatusData?.COMPLETE)}
          </div>
        </div>
        <div className="status-item">
          <div className="status-label">주문취소</div>
          <div className="status-value">
            {formatNumber(orderStatusData?.CANCEL)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
