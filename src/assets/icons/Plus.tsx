import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';

const SvgPlus = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 1a1 1 0 0 0-2 0v6H1a1 1 0 0 0 0 2h6v6a1 1 0 1 0 2 0V9h6a1 1 0 1 0 0-2H9V1Z"
      fill="#72A8BC"
    />
  </Svg>
);

const Memo = memo(SvgPlus);
export default Memo;
