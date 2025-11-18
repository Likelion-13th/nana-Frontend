// src/pages/Mypage/History.jsx
import React from "react";
import "../../styles/Mypage.css";

const History = ({ historyData = [], onCancel }) => {
  const formatCurrency = (amount) => {
    const safe = amount ?? 0;
    return new Intl.NumberFormat("ko-KR").format(safe);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("ko-KR");
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "배송중";
      case "COMPLETE":
        return "배송완료";
      case "CANCEL":
        return "주문취소";
      default:
        return status || "-";
    }
  };

  const handleCancelClick = (orderId, status) => {
    if (!onCancel) return;
    if (status !== "PROCESSING") {
      alert("배송중인 주문만 취소할 수 있습니다.");
      return;
    }
    onCancel(orderId);
  };

  return (
    <div className="history-container-wrap">
      <div className="history-title">나의 쇼핑 내역</div>
      <div className="history-container">
        <table className="history-table" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>주문 일자</th>
              <th>상품 정보</th>
              <th>수량</th>
              <th>구매 금액</th>
              <th>상태</th>
              <th>주문 취소</th>
            </tr>
          </thead>
          <tbody>
            {historyData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  주문 내역이 없습니다.
                </td>
              </tr>
            ) : (
              historyData.map((order) => (
                <tr key={order.orderId}>
                  <td>{formatDate(order.createdAt)}</td>

                  {/* ✅ 여기: 불필요한 div 빼고 텍스트만 */}
                  <td className="history-product-cell">{order.itemName}</td>

                  <td>{order.quantity}</td>
                  <td>{formatCurrency(order.finalPrice)}원</td>
                  <td>{renderStatus(order.status)}</td>
                  <td>
                    <div className="history-cancel">
                      {order.status === "PROCESSING" ? (
                        <div
                          className="history-cancel-button"
                          onClick={() =>
                            handleCancelClick(order.orderId, order.status)
                          }
                        >
                          취소
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
