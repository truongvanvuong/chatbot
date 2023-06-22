import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

import ChatBody from '../../Layout/Components/ChatBody';
import Header from '../../Layout/Components/Header';
import ChatInput from '../../Layout/Components/ChatInput';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const [chat, setChat] = useState([]);

    const ResponseAI = async (chat) => {
        try {
            const response = await axios.post(
                'http://localhost:7000/chatbot/chat',
                {
                    message: chat
                        .map((message) => message.message)
                        .join(' \n '),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const mutation = useMutation({
        mutationFn: () => {
            return ResponseAI(chat);
        },
        onSettled: (data, error) => {
            if (error) {
                console.log(error);
            } else if (data) {
                setChat((prev) => [
                    ...prev,
                    {
                        sender: 'ai',
                        message: data.message.replace(/^\n\n/, ''),
                    },
                ]);
            }
        },
    });
    const sendMessgae = async (message) => {
        await Promise.resolve(setChat((prev) => [...prev, message]));
        mutation.mutate();
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>
                <ChatBody chat={chat} />
                <ChatInput
                    sendMessgae={sendMessgae}
                    loading={mutation.isLoading}
                />
            </div>
        </div>
    );
}
export default Home;
