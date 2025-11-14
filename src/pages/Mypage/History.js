import React from "react";
import "../../styles/Mypage.css";

const History = () => {
    const onCancel = () => {
    alert("취소");
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
            {[1, 2, 3].map((_, index) => (
              <tr key={index}>
                <td>2025-01-01</td>
                <td className="history-product">엑스 베티버 오 드 퍼퓸</td>
                <td>1</td>
                <td>135,000원</td>
                <td>{index === 0 ? "배송중" : index === 1 ? "주문취소" : "배송완료"}</td>
                <td>
                  <div className="history-cancel">
                    <div
                      className="history-cancel-button"
                      onClick={onCancel}
                    >
                      취소
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
