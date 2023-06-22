import classNames from 'classnames/bind';
import autoAnimate from '@formkit/auto-animate';
import React, { useEffect, useRef } from 'react';

import logo from '../../../assets/logo.png';
import styles from './ChatBody.module.scss';

const cx = classNames.bind(styles);
function ChatBody({ chat }) {
    const parent = useRef(null);
    const bottomRef = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);
    return (
        <div className={cx('wrapper')} ref={parent}>
            {chat.length <= 0 ? (
                <div className={cx('show-default')}>
                    <div className={cx('heading')}>
                        <img src={logo} alt="xiaobu" />
                        <h1>Chào mừng bạn, tôi là một ChatBot</h1>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('box-item')}>
                            <h2 className={cx('box-title')}>
                                🧐 Đặt câu hỏi phức tạp
                            </h2>
                            <p className={cx('example')}>
                                Xây dựng ứng dụng thời tiết với thư viện ReactJS
                            </p>
                        </div>
                        <div className={cx('box-item')}>
                            <h2 className={cx('box-title')}>
                                🙌 Nhận câu trả lời tốt hơn
                            </h2>
                            <p className={cx('example')}>
                                Một số loại thưc phẩm tốt vào mùa hè là gì?
                            </p>
                        </div>
                        <div className={cx('box-item')}>
                            <h2 className={cx('box-title')}>
                                🎨 Lấy cảm hứng sáng tạo
                            </h2>
                            <p className={cx('example')}>
                                Phát triển kênh tiktok với chủ đề ẩm thức và
                                vlog
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                chat.map((message, i) => {
                    return (
                        <div
                            key={i}
                            className={cx('user-message', {
                                'ai-message': message.sender === 'ai',
                            })}
                        >
                            <pre className={cx('message-text')}>
                                <p>{message.message}</p>
                            </pre>
                        </div>
                    );
                })
            )}
            <div className={cx('bottom-ref')} ref={bottomRef}></div>
        </div>
    );
}

export default ChatBody;
