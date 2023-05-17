import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../assets/logo.png';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-logo')}>
                    <img className={cx('logo-img')} src={logo} alt="logo" />
                    <h2 className={cx('name-band')}>XiaoBu</h2>
                </div>
                <div className={cx('header-user')}>
                    <h2 className={cx('user-name')}>VanVuong</h2>
                    <img
                        className={cx('user-avatar')}
                        src="https://i.pinimg.com/originals/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg"
                        alt="VanVuong"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
