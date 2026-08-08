import type React from "react";

interface AboriginalFlagIconProps extends React.ComponentProps<'img'> {
  }
  const AboriginalFlagIcon: React.FC<AboriginalFlagIconProps> = (props) => (
  <img
    {...props}
    src="/images/about/AboriginalFlag.svg"
    alt="Australian Aboriginal Flag"
    width="24"
    height="24"
  />
);

export default AboriginalFlagIcon;
