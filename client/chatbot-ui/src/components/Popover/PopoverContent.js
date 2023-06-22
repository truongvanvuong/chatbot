import classNames from 'classnames/bind';

import styles from './Popover.module.scss';

const cx = classNames.bind(styles);
function PopoverContent({ handleLogout }) {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu')}>
                <li className={cx('item')} onClick={handleLogout}>
                    Đăng Xuất
                </li>
            </ul>
        </div>
    );
}

export default PopoverContent;
