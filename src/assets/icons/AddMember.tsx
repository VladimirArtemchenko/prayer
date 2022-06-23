import * as React from 'react';
import Svg, {SvgProps, Circle, Mask, Path, G} from 'react-native-svg';
import {memo} from 'react';

const SvgAddMember = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={16} cy={16} r={16} fill="#BFB393" />
    <Mask
      id="addMember_svg__a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={8}
      y={8}
      width={16}
      height={16}>
      <Path
        d="M15.273 23.273a.727.727 0 1 0 1.454 0v-6.546h6.546a.727.727 0 1 0 0-1.454h-6.546V8.727a.727.727 0 0 0-1.454 0v6.546H8.727a.727.727 0 0 0 0 1.454h6.546v6.546Z"
        fill="#fff"
      />
    </Mask>
    <G mask="url(#addMember_svg__a)">
      <Path fill="#fff" d="M7.273 7.273h17.454v17.454H7.273z" />
    </G>
  </Svg>
);

const Memo = memo(SvgAddMember);
export default Memo;
