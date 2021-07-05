import { FC } from 'react';
interface HeaderProps {
    /** 上一月 */
    onPrevClick: () => void;
    /** 下一月 */
    onNextClick: () => void;
    date: any;
}
declare const Header: FC<HeaderProps>;
export default Header;
