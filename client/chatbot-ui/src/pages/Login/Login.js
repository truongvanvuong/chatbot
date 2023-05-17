import classNames from 'classnames/bind';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import illustration from '../../assets/Chatbot-pana.png';
import styles from './Login.module.scss';
import Button from '../../components/Button/Button';

const cx = classNames.bind(styles);
function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
        console.log({ ...user, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = user;
        axios
            .post('http://localhost:7000/auth/login', {
                email,
                password,
            })
            .then(() => {
                setIsLoggedIn(true);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrapper-left')}>
                    <img
                        className={cx('illustration')}
                        src={illustration}
                        alt="hinhminhhoa"
                    />
                </div>
                <div className={cx('wrapper-right')}>
                    <h1 className={cx('title')}>Đăng nhập</h1>
                    <form
                        className={cx('form-controll')}
                        onSubmit={handleSubmit}
                    >
                        <div className={cx('form-item')}>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-item')}>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                placeholder="Mật khẩu"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('btn-submit')}>
                            <Button primary small fullWidth>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                    <div className={cx('to-login')}>
                        <p> Hoặc tạo tài khoản</p>
                        <Button text to="/signup">
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
