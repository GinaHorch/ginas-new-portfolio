import type React from "react";

interface PrideFlagIconProps extends React.ComponentProps<'img'> {
  }
  const PrideFlagIcon: React.FC<PrideFlagIconProps> = (props) => (
  <img
    {...props}
    src="/images/about/PrideFlag.svg"
    alt="LGBTQIA+ Pride Flag"
    width="24"
    height="24"
  />
);

export default PrideFlagIcon;
