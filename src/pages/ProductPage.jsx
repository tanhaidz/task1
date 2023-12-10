import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { Spin, Card, List, Pagination } from 'antd';
import './list-ant.css'
const ProductsPage = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.data);
    const loading = useSelector((state) => state.products.loading);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Số sản phẩm mỗi trang
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div className="loading"><Spin size='large' /></div> ;
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const currentProducts = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    return (
        <>
            <List style={{ width: '1200px', display: 'flex', margin: '0 auto', marginTop: '50px' }}
                grid={{
                    gutter: 20,
                    column: 3,

                }}
                dataSource={currentProducts}
                renderItem={(item) => (
                    <List.Item >
                        <Card key={item.id}

                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }>
                            <Card.Meta title={item.name} description={`${item.price} ngàn đồng`} />
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination
                style={{ textAlign: 'center', marginTop: '20px' }}
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
            />
        </>


    );
};

export default ProductsPage;