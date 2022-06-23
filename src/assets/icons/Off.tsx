import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';
import {memo} from 'react';

const SvgOff = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={0.5} width={21} height={21} rx={3.5} stroke="#514D47" />
  </Svg>
);

const Memo = memo(SvgOff);
export default Memo;
