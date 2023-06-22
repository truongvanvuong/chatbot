import classNames from 'classnames/bind';
import styles from './Frame.module.scss';

const cx = classNames.bind(styles);
function Frame({ children, illustration, className }) {
    const classes = cx('wrapper-left', {
        [className]: className,
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={classes}>
                    <img
                        className={cx('illustration')}
                        src={illustration}
                        alt="hinhminhhoa"
                    />
                </div>
                {children}
            </div>
        </div>
    );
}

export default Frame;
