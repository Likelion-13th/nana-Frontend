import React, { useState } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import PayModal from './../../components/PayModal';
import '../../styles/ProductPage.css';

const Diffuser = () => {
  const products = [
    {
      id: 1,
      name: "라벤더 디퓨저",
      brand: "브랜드 A",
      price: 18000,
      imagePath: "img/diffuser_1.png",
      isNew: true,
    },
    {
      id: 2,
      name: "시트러스 디퓨저",
      brand: "브랜드 B",
      price: 19000,
      imagePath: "img/diffuser_2.png",
      isNew: true,
    },
    {
      id: 3,
      name: "우디 디퓨저",
      brand: "브랜드 C",
      price: 20000,
      imagePath: "img/diffuser_3.png",
      isNew: true,
    },
    {
      id: 4,
      name: "화이트 머스크 디퓨저",
      brand: "브랜드 D",
      price: 21000,
      imagePath: "img/diffuser_4.png",
      isNew: true,
    },
    {
      id: 5,
      name: "로즈마리 디퓨저",
      brand: "브랜드 E",
      price: 22000,
      imagePath: "img/diffuser_5.png",
      isNew: true,
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Banner title="Diffuser" imagePath="banner_diffuser.jpg" />
      <div className="product-container">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <PayModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Diffuser;
