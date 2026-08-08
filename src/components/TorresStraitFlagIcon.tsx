import type React from "react";

interface TorresStraitFlagIconProps extends React.ComponentProps<'img'> {
  }
  const TorresStraitIslanderFlagIcon: React.FC<TorresStraitFlagIconProps> = (props) => (
  <img
    {...props}
    src="/images/about/TorresStraitIslanderFlag.svg"
    alt="Torres Strait Islander Flag"
    width="24"
    height="24"
  />
);

export default TorresStraitIslanderFlagIcon;
