import React, { useState } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import "../../styles/ProductPage.css";
import PayModal from "./../../components/PayModal";

const Perfume = () => {
    const products = [
        {
            id: 1,
            name: "퍼퓸",
            brand: "브랜드",
            price: 12000,
            imagePath: "img/perfume_1.png",
            isNew: false
        },
        {
            id: 2,
            name: "퍼퓸",
            brand: "브랜드",
            price: 28000,
            imagePath: "img/perfume_2.png",
            isNew: false
        },
        {
            id: 3,
            name: "퍼퓸",
            brand: "브랜드",
            price: 32000,
            imagePath: "img/perfume_3.png",
            isNew: false
        },
        {
            id: 4,
            name: "퍼퓸",
            brand: "브랜드",
            price: 99000,
            imagePath: "img/perfume_4.png",
            isNew: false
        },
        {
            id: 5,
            name: "퍼퓸",
            brand: "브랜드",
            price: 14000,
            imagePath: "img/perfume_5.png",
            isNew: false
        },
        {
            id: 6,
            name: "퍼퓸",
            brand: "브랜드",
            price: 23000,
            imagePath: "img/perfume_6.png",
            isNew: false
        },
        {
            id: 7,
            name: "퍼퓸",
            brand: "브랜드",
            price: 21000,
            imagePath: "img/perfume_7.png",
            isNew: false
        },
        {
            id: 8,
            name: "퍼퓸",
            brand: "브랜드",
            price: 29000,
            imagePath: "img/perfume_8.png",
            isNew: false
        },
        {
            id: 9,
            name: "퍼퓸",
            brand: "브랜드",
            price: 42000,
            imagePath: "img/perfume_9.png",
            isNew: false
        },
        {
            id: 10,
            name: "퍼퓸",
            brand: "브랜드",
            price: 17000,
            imagePath: "img/perfume_10.png",
            isNew: false
        },
        {
            id: 11,
            name: "퍼퓸",
            brand: "브랜드",
            price: 10000,
            imagePath: "img/perfume_11.png",
            isNew: false
        },
        {
            id: 12,
            name: "퍼퓸",
            brand: "브랜드",
            price: 20000,
            imagePath: "img/perfume_12.png",
            isNew: false
        },
        {
            id: 13,
            name: "퍼퓸",
            brand: "브랜드",
            price: 22000,
            imagePath: "img/perfume_13.png",
            isNew: false
        },
        {
            id: 14,
            name: "퍼퓸",
            brand: "브랜드",
            price: 27000,
            imagePath: "img/perfume_14.png",
            isNew: false
        },
        {
            id: 15,
            name: "퍼퓸",
            brand: "브랜드",
            price: 32000,
            imagePath: "img/perfume_15.png",
            isNew: false
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
            <Banner title="Perfume" imagePath={"/banner_perfume.png"} />
            <div className='product-container'>
                <div className='product-grid'>
                    {currentProducts.map((product, index) => (
                        <ProductCard
                            key={index}
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

export default Perfume;
