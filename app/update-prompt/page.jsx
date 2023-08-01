"use client";

import { Form } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const promptId = params.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    chatURL: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`, { method: "GET" });
        const { tag, prompt, chatURL } = await res.json();
        setPost({
          prompt,
          tag,
          chatURL,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (promptId) fetchPost();
  }, [promptId]);

  const editPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          chatURL: post.chatURL,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      loading={loading}
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={editPost}
    />
  );
};

export default CreatePrompt;
