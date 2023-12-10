import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import './menu.css'
const items = [
    {
        label: (
            <Link to='/'>Trang chủ</Link>
        ),
        key: 'home',
    },
    {
        label: (
            <Link to='/products'>Sản phẩm</Link>
        ),
        key: 'product',
    },
    {
        label: (
            <Link to='/manage-product'>Quản lý sản phẩm</Link>
        ),
        key: 'manage-product',
    },
];
const MainMenu = () => {
    const [current, setCurrent] = useState('home');
    const location = useLocation();


    const onClick = (e) => {
        setCurrent(location.pathname)
    };
    useEffect(() => {
        setCurrent(location.pathname)
    })
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '20px' }} />

        </>

    );
};

export default MainMenu;
