import classNames from 'classnames/bind';
import React, { useState } from 'react';
import axios from 'axios';

import illustration from '../../assets/Innovation-bro.png';
import styles from './Signup.module.scss';
import Button from '../../components/Button/Button';

const cx = classNames.bind(styles);
function Signup() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
        console.log({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //object destructuring
        const { username, email, password } = user;
        axios
            .post('http://localhost:7000/auth/register', {
                username,
                email,
                password,
            })
            .then(() => {
                alert('Đăng ký thành công');
            })
            .catch((error) => {
                alert('Người dùng đã tồn tại');
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
                    <h1 className={cx('title')}>Tạo tài khoản</h1>
                    <form
                        className={cx('form-controll')}
                        onSubmit={handleSubmit}
                    >
                        <div className={cx('form-item')}>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInput}
                                placeholder="Tên người dùng"
                            />
                        </div>
                        <div className={cx('form-item')}>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                placeholder="Email"
                            />
                        </div>
                        <div className={cx('form-item')}>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className={cx('btn-submit')}>
                            <Button primary small fullWidth>
                                Đăng ký
                            </Button>
                        </div>
                    </form>
                    <div className={cx('to-login')}>
                        <p> Bạn đã có tài khoản ?</p>
                        <Button text to="/login">
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
