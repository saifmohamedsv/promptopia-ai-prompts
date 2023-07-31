"use client";

import { Profile } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session, router]);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this prompt ?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/prompt/${id}`, { method: "DELETE" });

        if (res.ok) {
          router.push("/");
        }
      } catch (error) {}
    }
  };

  return (
    <Profile
      loading={loading}
      name={session?.user.name}
      description={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
