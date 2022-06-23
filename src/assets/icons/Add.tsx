import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';
import {memo} from 'react';

const SvgAdd = (props: SvgProps) => (
  <Svg
    width={24}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="add_svg__a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={0}
      width={22}
      height={22}>
      <Path
        d="M11 21a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2h-9V1a1 1 0 1 0-2 0v9H2a1 1 0 1 0 0 2h9v9Z"
        fill="#72A8BC"
      />
    </Mask>
    <G mask="url(#add_svg__a)">
      <Path fill="#72A8BC" d="M0-1h24v24H0z" />
    </G>
  </Svg>
);

const Memo = memo(SvgAdd);
export default Memo;
