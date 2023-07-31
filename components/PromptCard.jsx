"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        {/* classnames: width: 100% */}
        <div
          onClick={() =>
            router.push(
              `/profile/${post.creator._id}?name=${post.creator.username}`
            )
          }
          className="w-full flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post?.creator?.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="user_image"
            loading="lazy"
            lazyBoundary="loading"
          />

          {/* classnames: width: 80% */}
          <div className="flex flex-col w-[80%]">
            {/* classnames: overflow:hiddene, whtiespace-nowrapm text-overflow: ellipsis */}
            <h3
              title={post?.creator?.email}
              className="overflow-hidden whitespace-nowrap text-ellipsis font-satoshi font-semibold text-gray-900"
            >
              {post?.creator?.email}
              {/* {post?.creator?.email.slice(0, 15) + "..."} */}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.username}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={20}
            height={20}
          />
        </div>
      </div>

      <p className="max-w-full break-words my-4 font-satoshi text-sm text-gray-700">
        {post?.prompt}
      </p>

      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        #{post?.tag}
      </p>

      {session?.user?.id === post?.creator?._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post?._id)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post?._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
