import { FC } from 'react';
interface BodyProps {
    defaultValue?: any;
    range: boolean;
    itemRender: boolean;
    ranges: any;
    isAnimating: boolean;
    bodyWidth: number;
    itemClass?: any;
    selectable?: any;
    startDate?: any;
    endDate?: any;
    minDate?: any;
    maxDate?: any;
    disabledDates?: any;
    date?: any;
    animateEnd?: any;
}
declare const Body: FC<BodyProps>;
export default Body;
