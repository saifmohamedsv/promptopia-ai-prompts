import Image from "next/image";
import React from "react";

const Loader = ({ size = 48 }) => {
  return <Image src={"/assets/icons/loader.svg"} width={size} height={size} />;
};

export default Loader;
