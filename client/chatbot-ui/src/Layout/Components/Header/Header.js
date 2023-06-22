import classNames from 'classnames/bind';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'antd';

import PopoverContent from '../../../components/Popover';
import styles from './Header.module.scss';
import logo from '../../../assets/logo.png';
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [showArrow, setShowArrow] = useState(false);
    const userId = localStorage.getItem('userID').replace(/"/g, '');
    const [user, setUser] = useState([]);

    const mergedArrow = useMemo(() => {
        setShowArrow(true);
        return showArrow;
    }, [showArrow]);

    useEffect(() => {
        const userData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:7000/user/${userId}`
                );
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        userData();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userID');
        navigate('/');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-logo')}>
                    <img className={cx('logo-img')} src={logo} alt="logo" />
                    <h2 className={cx('name-band')}>ChatBot</h2>
                </div>
                <div className={cx('header-user')}>
                    <Popover
                        placement="bottomRight"
                        content={<PopoverContent handleLogout={handleLogout} />}
                        arrow={mergedArrow}
                    >
                        <h2 className={cx('user-name')}>{user.username}</h2>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default Header;
