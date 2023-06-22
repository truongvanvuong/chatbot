import React, { useEffect } from 'react';

const Chat = () => {
    useEffect(() => {
        if (!window.kommunicate) {
            (function (d, m) {
                const kommunicateSettings = {
                    appId: '4080cc1addd39124aa21e1c5debde08',
                    popupWidget: true,
                    automaticChatOpenOnNavigation: true,
                    voiceInput: true,
                    timeFormat24Hours: true,
                    conversationTitle: 'Trò chuyện',
                    language: 'en-US',
                };
                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
                const h = document.getElementsByTagName('head')[0];
                h.appendChild(s);
                window.kommunicate = m;
                m._globals = kommunicateSettings;
            })(document, window.kommunicate || {});
        }
    }, []);

    return null;
};

export default Chat;
