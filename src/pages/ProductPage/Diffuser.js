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
      isNew: false,
    },
    {
      id: 2,
      name: "시트러스 디퓨저",
      brand: "브랜드 B",
      price: 19000,
      imagePath: "img/diffuser_2.png",
      isNew: false,
    },
    {
      id: 3,
      name: "우디 디퓨저",
      brand: "브랜드 C",
      price: 20000,
      imagePath: "img/diffuser_3.png",
      isNew: false,
    },
    {
      id: 4,
      name: "화이트 머스크 디퓨저",
      brand: "브랜드 D",
      price: 21000,
      imagePath: "img/diffuser_4.png",
      isNew: false,
    },
    {
      id: 5,
      name: "로즈마리 디퓨저",
      brand: "브랜드 E",
      price: 29000,
      imagePath: "img/diffuser_5.png",
      isNew: false,
    },
    {
      id: 6,
      name: "포레스트 디퓨저",
      brand: "브랜드 F",
      price: 52000,
      imagePath: "img/diffuser_6.png",
      isNew: false,
    },
    {
      id: 7,
      name: "시더우드 디퓨저",
      brand: "브랜드 G",
      price: 29000,
      imagePath: "img/diffuser_7.png",
      isNew: false,
    },
    {
      id: 8,
      name: "샌달우드 디퓨저",
      brand: "브랜드 H",
      price: 12000,
      imagePath: "img/diffuser_8.png",
      isNew: false,
    },
    {
      id: 9,
      name: "오크앤머스크 디퓨저",
      brand: "브랜드 I",
      price: 22000,
      imagePath: "img/diffuser_9.png",
      isNew: false,
    },
    {
      id: 10,
      name: "허브가든 디퓨저",
      brand: "브랜드 J",
      price: 24000,
      imagePath: "img/diffuser_10.png",
      isNew: false,
    },
    {
      id: 11,
      name: "파인미스트 디퓨저",
      brand: "브랜드 K",
      price: 25000,
      imagePath: "img/diffuser_11.png",
      isNew: false,
    },
    {
      id: 12,
      name: "베티버그라운드 디퓨저",
      brand: "브랜드 L",
      price: 28000,
      imagePath: "img/diffuser_12.png",
      isNew: false,
    },
    {
      id: 13,
      name: "자스민 디퓨저",
      brand: "브랜드 M",
      price: 28000,
      imagePath: "img/diffuser_13.png",
      isNew: false,
    },
    {
      id: 14,
      name: "시트러스릴리 디퓨저",
      brand: "브랜드 N",
      price: 12000,
      imagePath: "img/diffuser_14.png",
      isNew: false,
    },
    {
      id: 15,
      name: "피치가드니아 디퓨저",
      brand: "브랜드 O",
      price: 32000,
      imagePath: "img/diffuser_15.png",
      isNew: false,
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
      <Banner title="Diffuser" imagePath="banner_diffuser.jpg" />
      <div className="product-container">
        <div className="product-grid">
          {currentProducts.map((product, index) => (
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

export default Diffuser;
