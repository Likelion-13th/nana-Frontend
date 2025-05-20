import React, { useState } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import PayModal from './../../components/PayModal';
import '../../styles/ProductPage.css';

const New = () => {
  const products = [
    {
      id: 1,
      name: "신상 퍼퓸 A",
      brand: "브랜드A",
      price: 25000,
      imagePath: "img/perfume_1.png",
      isNew: true,
    },
    {
      id: 2,
      name: "신상 퍼퓸 B",
      brand: "브랜드B",
      price: 26000,
      imagePath: "img/perfume_2.png",
      isNew: true,
    },
    {
      id: 3,
      name: "신상 디퓨저 C",
      brand: "브랜드C",
      price: 18000,
      imagePath: "img/diffuser_1.png",
      isNew: true,
    },
    {
      id: 4,
      name: "신상 디퓨저 D",
      brand: "브랜드D",
      price: 19000,
      imagePath: "img/diffuser_2.png",
      isNew: true,
    },
    {
      id: 5,
      name: "신상 향수 E",
      brand: "브랜드E",
      price: 21000,
      imagePath: "img/perfume_3.png",
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
      <Banner title="New" imagePath="banner_main.jpg" />
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

export default New;
