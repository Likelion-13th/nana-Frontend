import React, { useState } from "react";

const Address = ({ handleSave }) => {
	
	// 🚩useState
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  
  // 🚩onChange
  const handleAddressDetailChange = (e) => setAddressDetail(e.target.value);
	

	
	// 🚩openAPI
	const handleSearchPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipcode(data.zonecode);
        setAddress(data.roadAddress || data.jibunAddress);
      }
    }).open();
  };
	
  return (
    <div className="address-container-wrap">
        <div className="address-title">배송지 관리</div>
        <div className="address-container">
            <div className="address-section">
                <div className="address-post">
                    <input 
		                    className="address-input-post" 
		                    value={zipcode} 
		                />
                </div>
                <div 
		                className="address-button" 
		                onClick={handleSearchPostcode}
		            >우편번호 찾기</div>
            </div>
            <div className="address-section">
                <div className="address-base">
                    <input 
		                    className="address-input-base" 
		                    value={address} 
		                />
                </div>
            </div>
            <div className="address-section">
                <div className="address-detail">
                    <input 
		                    className="address-input-detail" 
			                  value={addressDetail} 
			                  onChange={handleAddressDetailChange}
		                />
                </div>
                <div 
		                className="address-button"
					          onClick={() => handleSave(zipcode, address, addressDetail)}
		            >
                    저장하기
                </div>
            </div>
        </div>
    </div>  
    );
};
export default Address;