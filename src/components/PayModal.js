
import React, { useState, useEffect } from "react";
import "../styles/PayModal.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const PayModal = ({ product, onClose }) => {
  const [ cookies ] = useCookies(["accessToken"]);
  const [maxMileage, setMaxMileage] = useState(0);

  useEffect(() => {
            axios
            .get("/users/milage", {
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            })
            .then((response) => {
              setMaxMileage(response.data.result.maxMilate);
            })
            .catch((err) => {
                console.log("LOGOUT API 요청 실패:", err);
            });
  },[cookies.accessToken]);

  
	// 주문할 상품 개수 (기본값 1개)
  const [quantity, setQuantity] = useState(1);
  // 사용자가 입력한 마일리지 금액
  const [mileageToUse, setMileageToUse] = useState("");
  // 최대 사용 가능 마일리지
  // const maxMileage = 100000;
  // 상품 가격
  const [, setProductPrice] = useState(product.price);
  // 총 결제 금액
  const [totalPrice, setTotalPrice] = useState(product.price);
  
  // 수량 증가 및 감소 함수
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "plus" ? prev + 1 : Math.max(1, prev - 1))); // 최소 1개 보장
  };

	// quantity, mileageToUse, product.price 값 중 하나라도 바뀌면 실행
  useEffect(() => {
    const newProductPrice = product.price * quantity; // 총 상품 가격 계산
    setProductPrice(newProductPrice);
    // 마일리지 차감 후 총 결제 금액 계산 (최소 0원 보장)
    setTotalPrice(Math.max(newProductPrice - mileageToUse, 0)); 
  }, [quantity, mileageToUse, product.price]);

	// input에 입력할 때 실행
  const handleMileageChange = (e) => {
    // input 박스에 입력한 값 가져오기
    const value = e.target.value;
    // 입력값이 없을 경우 0, 최대 마일리지를 초과하지 않도록 제한
    const numericValue = value === "" ? 0 : Math.min(Number(value), maxMileage); 
    setMileageToUse(numericValue);
  };

  return (
    <div className="modal">
	    {/* 모달 바깥 영역 클릭 시 닫기 */}
      <div className="overlay" onClick={onClose}></div>
      {/* 모달 본문 영역 */}
      <div className="container">
	      {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="title">주문 / 결제</div>

				{/* 주문 상품 정보 */}
        <div className="section">
          <div className="section-title">주문 상품</div>
          <div className="order-info">
	          {/* 상품 이미지 표시 */}
            <img
              src={product.imagePath}
              alt={product.name}
              className="order-image"
            />
            <div>
              <div className="order-name">{product.name}</div>
              <div className="order-brand">{product.brand}</div>
              <div className="order-price">
                {product.price.toLocaleString()} 원
              </div>
              {/* 수량 조절 버튼 */}
              <div className="quantity-control">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange("minus")}
                >
                  -
                </button>
                <div className="quantity">{quantity}</div>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

				{/* 배송지 정보 */}
        <div className="section">
          <div className="section-title">배송지</div>
          <div className="user-info">나나</div>
          <div className="user-info">010-4276-4930</div>
          <div className="user-info">
            경기도 고양시 덕양구 항공대학로 76 국제은익관 1생활관 F418
          </div>
        </div>
        
				{/* 마일리지 사용 입력란 */}
        <div className="section">
          <div className="section-title">마일리지 사용</div>
          <div className="mileage-info">
            현재 사용 가능한 마일리지: {maxMileage.toLocaleString()} 원
          </div>
          <input
            className="mileageToUse-input"
            placeholder="사용하실 마일리지를 입력하세요"
            value={mileageToUse}
            onChange={handleMileageChange}
          />
        </div>

				{/* 총 결제 금액 표시 */}
        <div className="section">
          <div className="section-title">총 결제금액</div>
          <div className="total">
            <div>
              <div className="total-item">총 상품금액</div>
              <div className="total-item">마일리지 할인</div>
              <div className="total-item">배송비</div>
            </div>
            <div>
	            {/* 상품 금액 */}
              <div className="total-value">
                {totalPrice.toLocaleString()} 원
              </div>
              {/* 마일리지 할인 표시 */}
              <div className="total-value discount">
                -{mileageToUse.toLocaleString()} 원
              </div>
              {/* 무료배송 표시 */}
              <div className="total-value">무료배송</div>
            </div>
          </div>
        </div>
        
				{/* 결제 버튼 */}
        <button className="pay-button">결제하기</button>
      </div>
    </div>
  );
};

export default PayModal;
