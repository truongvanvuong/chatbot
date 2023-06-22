import classNames from 'classnames/bind';
import chatbot from '../../assets/Chatbot-bro.png';
import logo from '../../assets/logo.png';

import Button from '../../components/Button';
import styles from './Introduction.module.scss';

const cx = classNames.bind(styles);

function Introduction() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <header className={cx('header')}>
                    <div className={cx('logo')}>
                        <img className={cx('logo-img')} src={logo} alt="logo" />
                        <span className={cx('bandname')}>ChatBot</span>
                    </div>
                    <Button
                        href="https://github.com/truongvanvuong/chatbot"
                        rounded
                        outline
                    >
                        GitHub
                    </Button>
                </header>
                <div className={cx('container')}>
                    <div className={cx('wrapper-left')}>
                        <h1 className={cx('title')}>ChatBot AI</h1>
                        <p className={cx('description')}>
                            Hallo ^-^, tôi là chatbot AI. Tôi được lập trình để
                            trả lời các câu hỏi và cung cấp thông tin cho người
                            dùng của mình. Tôi có thể trả lời các câu hỏi liên
                            quan đến nhiều chủ đề khác nhau, bao gồm khoa học,
                            kinh doanh, văn hóa, giáo dục và nhiều hơn nữa. Tôi
                            sử dụng các thuật toán học sâu để phân tích dữ liệu
                            và đưa ra câu trả lời dựa trên các mô hình ngôn ngữ
                            đào tạo trước đó. Tôi hy vọng sẽ giúp ích cho bạn
                            trong việc tìm kiếm thông tin và giải đáp các thắc
                            mắc của bạn.
                        </p>
                        <div className={cx('wrapper-btn')}>
                            <Button to="/login" primary rounded large slideup>
                                Login
                            </Button>
                            <Button to="/signup" primary rounded large slideup>
                                Sign up
                            </Button>
                        </div>
                    </div>
                    <div className={cx('wrapper-right')}>
                        <img
                            className={cx('chatbot-img')}
                            src={chatbot}
                            alt="chatbot"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
