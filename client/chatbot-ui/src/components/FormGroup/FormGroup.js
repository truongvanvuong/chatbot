import classNames from 'classnames/bind';

import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);
function FormGroup({
    message,
    type,
    name,
    value,
    placeholder,
    onChange,
    className,
    isShowMessage,
    onBlur,
    onFocus,
    ...passProps
}) {
    const props = {
        ...passProps,
    };

    const classes = cx('form-control', {
        [className]: className,
    });
    return (
        <div
            className={cx('form-group', {
                erorr: isShowMessage,
            })}
        >
            <input
                className={classes}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                {...props}
            />
            {isShowMessage && <p>{message}</p>}
        </div>
    );
}

export default FormGroup;
