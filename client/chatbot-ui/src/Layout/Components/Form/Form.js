import classNames from 'classnames/bind';
import Button from '../../../components/Button';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);
function Form({
    titleForm,
    children,
    onSubmit,
    titlButton,
    titleToLink,
    titleButtonLink,
    path,
}) {
    return (
        <div className={cx('wrapper-right')}>
            <h1 className={cx('title')}>{titleForm}</h1>
            <form className={cx('form')} onSubmit={onSubmit}>
                {children}
                <div className={cx('btn-submit')}>
                    <Button primary small fullWidth>
                        {titlButton}
                    </Button>
                </div>
            </form>
            <div className={cx('to-login')}>
                <p>{titleToLink}</p>
                <Button text to={path}>
                    {titleButtonLink}
                </Button>
            </div>
        </div>
    );
}

export default Form;
