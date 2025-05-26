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
    },
    {
      id: 6,
      name: "신상 향수 F",
      brand: "브랜드F",
      price: 26000,
      imagePath: "img/perfume_4.png",
      isNew: true,
    },
    {
      id: 7,
      name: "신상 향수 G",
      brand: "브랜드G",
      price: 11000,
      imagePath: "img/diffuser_5.png",
      isNew: true,
    },
    {
      id: 8,
      name: "신상 향수 H",
      brand: "브랜드H",
      price: 41000,
      imagePath: "img/diffuser_6.png",
      isNew: true,
    },
    {
      id: 9,
      name: "신상 향수 I",
      brand: "브랜드i",
      price: 22000,
      imagePath: "img/perfume_6.png",
      isNew: true,
    },
    {
      id: 10,
      name: "신상 향수 J",
      brand: "브랜드J",
      price: 11000,
      imagePath: "img/perfume_7.png",
      isNew: true,
    },
    {
      id: 11,
      name: "신상 향수 K",
      brand: "브랜드K",
      price: 29000,
      imagePath: "img/diffuser_7.png",
      isNew: true,
    },
    {
      id: 12,
      name: "신상 향수 L",
      brand: "브랜드L",
      price: 21000,
      imagePath: "img/perfume_5.png",
      isNew: true,
    },
    {
      id: 13,
      name: "신상 향수 M",
      brand: "브랜드M",
      price: 28000,
      imagePath: "img/diffuser_8.png",
      isNew: true,
    },
    {
      id: 14,
      name: "신상 향수 N",
      brand: "브랜드N",
      price: 22000,
      imagePath: "img/diffuser_9.png",
      isNew: true,
    },
    {
      id: 15,
      name: "신상 향수 O",
      brand: "브랜드O",
      price: 31000,
      imagePath: "img/perfume_8.png",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <Banner title="New" imagePath="banner_main.jpg" />
      <div className="product-container">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </div>

        <div className="paging">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
                
              </button>
            )
          )}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
        
      </div>

      {isModalOpen && (
        <PayModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default New;
