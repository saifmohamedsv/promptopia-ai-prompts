"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Profile } from "@/components";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPosts(data);
      console.log(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName} personalized profile page, you can explore his prompts and be inspired`}
      data={posts}
    />
  );
};

export default UserProfile;
