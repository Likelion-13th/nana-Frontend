import React, { useState , useEffect } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import "../../styles/ProductPage.css";
import PayModal from "./../../components/PayModal";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Perfume = () => {
    const [products, SetProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        if(typeof cookies.accessToken !== "string") {
        alert("로그인이 필요합니다");
        return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const [cookies] = useCookies(['accessToken']);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
            axios
            .get("/categories/2/items", {
                headers: {
                    accept: "*/*",
                },
            })
            .then((response) => {
              SetProducts(response.data.result);
            })
            .catch((err) => {
                console.log("LOGOUT API 요청 실패:", err);
            });
    },[cookies.accessToken]);

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
