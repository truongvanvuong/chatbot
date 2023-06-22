import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Frame from '../../Layout/Components/Frame';
import Form from '../../Layout/Components/Form';
import FormGroup from '../../components/FormGroup';
import illustrationLogin from '../../assets/Chatbot-pana.png';
import ValidateEmail from '../../Handle/ValidateEamail';

function Login({ setIsLoggedIn }) {
    const [isMessageEmail, SetIsMessageEmail] = useState(false);
    const [isMessagePassword, SetIsMessagePassword] = useState(false);
    const [messageEmail, SetMessageEmail] = useState('');
    const [messagePassword, SetMessagePassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const showMessage = (name, value) => {
        if (name === 'email') {
            if (value === '') {
                SetMessageEmail('Nhập email của bạn');
                SetIsMessageEmail(true);
            } else {
                if (!ValidateEmail(value)) {
                    SetMessageEmail('Email Không hợp lệ');
                    SetIsMessageEmail(true);
                }
            }
        } else if (name === 'password' && value === '') {
            SetMessagePassword('Nhập mật khẩu của bạn');
            SetIsMessagePassword(true);
        }
    };
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
        if (name === 'email' && value !== '') {
            SetMessageEmail('');
            SetIsMessageEmail(false);
        }
        if (name === 'password' && value !== '') {
            SetMessagePassword('');
            SetIsMessagePassword(false);
        }
    };
    const handleBlur = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        showMessage(name, value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = user;

        const name = Object.keys(user);
        const value = Object.values(user);

        if (user.email === '' || user.password === '') {
            showMessage(name[0], value[0]);
            showMessage(name[1], value[1]);
        } else {
            axios
                .post('http://localhost:7000/auth/login', {
                    email,
                    password,
                })
                .then((response) => {
                    setIsLoggedIn(true);
                    localStorage.setItem(
                        'userID',
                        JSON.stringify(response.data._id)
                    );
                    navigate('/home');
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        SetMessageEmail('Email không chính xác');
                        SetIsMessageEmail(true);
                    } else if (error.response.status === 401) {
                        SetMessagePassword('Mật khẩu không đúng');
                        SetIsMessagePassword(true);
                    }
                    console.log(error);
                });
        }
    };
    return (
        <Frame illustration={illustrationLogin}>
            <Form
                titleForm="Đăng Nhập"
                onSubmit={handleSubmit}
                titlButton="Đăng Nhập"
                titleToLink="Bạn chưa có tài khoản ?"
                titleButtonLink="Đăng ký"
                path="/signup"
            >
                <FormGroup
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isShowMessage={isMessageEmail}
                    message={messageEmail}
                />
                <FormGroup
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isShowMessage={isMessagePassword}
                    message={messagePassword}
                />
            </Form>
        </Frame>
    );
}

export default Login;
