import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CopyChatURL = () => {
  const router = useRouter();
  return (
    <div
      id="chatGPTURL"
      className="absolute top-0 left-0 w-[100%] h-[100vh] z-50 bg-[rgba(0,0,0,0.7)] flex flex-col gap-2 items-center justify-center"
    >
      <h1 className="text-white">How to copy chatGPT chat URL</h1>
      <Image
        src={"/assets/how-to-copy-chatgpt.gif"}
        width={720}
        height={720}
        alt="How to copy chatGPT gif"
      />

      <button
        className="black_btn px-36"
        onClick={() => {
          window.localStorage.setItem("tutorial", false);
          router.refresh();
        }}
      >
        Skip
      </button>
    </div>
  );
};

export default CopyChatURL;
