import React from "react";
import "../../styles/Mypage.css"; 

const Status = ({ orderStatusData }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount)
    }
    return (
        <div className="status-container-wrap">
            <div className="status-title">나의 주문 현황</div>
            <div className="status-container">
                <div className="status-section">
                    <div className="status-stat-label">배송중</div>
                    <div className="status-stat-value">
                        <span>{formatCurrency(orderStatusData?.PROCESSING)}</span>
                    </div>
                </div>
                <div className="status-section">
                    <div className="status-stat-label">배송완료</div>
                    <div className="status-stat-value">
                        <span>{formatCurrency(orderStatusData?.COMPLETE)}</span>
                    </div>
                </div>
                <div className="status-section">
                    <div className="status-stat-label">주문취소</div>
                    <div className="status-stat-value">
                        <span>{formatCurrency(orderStatusData?.CANCEL)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status;
