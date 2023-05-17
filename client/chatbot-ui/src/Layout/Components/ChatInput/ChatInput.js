import classNames from 'classnames/bind';
import React, { useState } from 'react';

import loader from '../../../assets/loading.gif';
import styles from './ChatInput.module.scss';

const cx = classNames.bind(styles);
function ChatInput({ sendMessgae, loading }) {
    const [value, setValue] = useState('');

    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = () => {
        if (value === '') return;
        sendMessgae({
            sender: 'user',
            message: value,
        });
        setValue('');
    };
    const handleEnter = (e) => {
        e.keyCode === 13 && e.shiftKey === false && handleSubmit();
    };
    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <img src={loader} alt="loading" className={cx('loader')} />
            ) : (
                <>
                    <textarea
                        className={cx('chat-input')}
                        onKeyUp={handleEnter}
                        rows={1}
                        value={value}
                        onChange={handleInput}
                    />
                    <div className={cx('send')} onClick={handleSubmit}>
                        <svg
                            width="30px"
                            height="30px"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#b46fc4"
                            viewBox="0 0 2048 2048"
                        >
                            <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z"></path>
                        </svg>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatInput;
