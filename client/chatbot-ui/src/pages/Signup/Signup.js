import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import Frame from '../../Layout/Components/Frame';
import FormGroup from '../../components/FormGroup';
import Form from '../../Layout/Components/Form';
import illustrationSignup from '../../assets/Innovation-bro.png';
import ValidateEmail from '../../Handle/ValidateEamail';

function Signup() {
    const navigate = useNavigate();
    const [isMessageName, SetIsMessageName] = useState(false);
    const [isMessageEmail, SetIsMessageEmail] = useState(false);
    const [isMessagePassword, SetIsMessagePassword] = useState(false);
    const [messageName, SetMessageName] = useState('');
    const [messageEmail, SetMessageEmail] = useState('');
    const [messagePassword, SetMessagePassword] = useState('');
    const [modal, contextHolderModal] = Modal.useModal();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const countDown = () => {
        let secondsToGo = 5;
        const instance = modal.success({
            footer: null,
            title: 'Đăng ký tài khoản thành công',
            content: `Bạn sẽ được chuyển hướng đến trang đăng nhập sau ${secondsToGo} giây`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            instance.update({
                content: `Bạn sẽ được chuyển hướng đến trang đăng nhập sau ${secondsToGo} giây`,
            });
            if (secondsToGo === 0) {
                navigate('/login');
            }
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
        }, secondsToGo * 1000);
    };

    const showMessage = (name, value) => {
        if (name === 'username' && value === '') {
            SetMessageName('Nhập tên của bạn');
            SetIsMessageName(true);
        } else if (name === 'email') {
            if (value === '') {
                SetMessageEmail('Nhập email của bạn');
                SetIsMessageEmail(true);
            } else {
                if (!ValidateEmail(value)) {
                    SetMessageEmail('Email Không hợp lệ');
                    SetIsMessageEmail(true);
                }
            }
        } else if (name === 'password') {
            const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (value === '') {
                SetMessagePassword('Nhập mật khẩu của bạn');
                SetIsMessagePassword(true);
            } else {
                const checkPassword = value.match(regexPassword);
                if (!checkPassword) {
                    SetMessagePassword(
                        'Tối thiểu tám ký tự, ít nhất có một chữ cái và một số'
                    );
                    SetIsMessagePassword(true);
                }
            }
        }
    };
    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });

        if (name === 'username' && value !== '') {
            SetMessageName('');
            SetIsMessageName(false);
        } else if (name === 'email' && value !== '') {
            SetMessageEmail('');
            SetIsMessageEmail(false);
        } else if (name === 'password' && value !== '') {
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
        //object destructuring
        const { username, email, password } = user;

        const name = Object.keys(user);
        const value = Object.values(user);

        if (user.username === '' || user.email === '' || user.password === '') {
            showMessage(name[0], value[0]);
            showMessage(name[1], value[1]);
            showMessage(name[2], value[2]);
        } else {
            axios
                .post('http://localhost:7000/auth/register', {
                    username,
                    email,
                    password,
                })
                .then((response) => {
                    if (response.status === 200) {
                        countDown();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        SetMessageName(error.response.data);
                        SetIsMessageName(true);
                    } else if (error.response.status === 401) {
                        SetMessageEmail(error.response.data);
                        SetIsMessageEmail(true);
                    }
                    console.log(error);
                });
        }
    };
    return (
        <>
            {contextHolderModal}
            <Frame
                illustration={illustrationSignup}
                className="wrapper-left-login"
            >
                <Form
                    titleForm="Đăng Ký"
                    onSubmit={handleSubmit}
                    titlButton="Đăng Ký"
                    titleToLink="Bạn đã có tài khoản ?"
                    titleButtonLink="Đăng nhập"
                    path="/login"
                >
                    <FormGroup
                        isShowMessage={isMessageName}
                        message={messageName}
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleOnChange}
                        placeholder="Tên người dùng"
                        onBlur={handleBlur}
                    />

                    <FormGroup
                        isShowMessage={isMessageEmail}
                        message={messageEmail}
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleOnChange}
                        placeholder="Email"
                        onBlur={handleBlur}
                    />
                    <FormGroup
                        isShowMessage={isMessagePassword}
                        message={messagePassword}
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleOnChange}
                        placeholder="Mật khẩu"
                        onBlur={handleBlur}
                    />
                </Form>
            </Frame>
        </>
    );
}

export default Signup;
