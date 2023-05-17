import classNames from 'classnames/bind';
import autoAnimate from '@formkit/auto-animate';
import React, { useEffect, useRef } from 'react';

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
            {chat.map((message, i) => {
                return (
                    <div
                        key={i}
                        className={cx('client-message', {
                            'ai-message': message.sender === 'ai',
                        })}
                    >
                        <pre className={cx('message-text')}>
                            <p>{message.message}</p>
                        </pre>
                    </div>
                );
            })}
            <div className={cx('bottom-ref')} ref={bottomRef}></div>
        </div>
    );
}

export default ChatBody;
