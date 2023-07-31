import Link from "next/link";
import { PromptCard } from ".";

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="capitalize head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {!data.length && (
          <p className="desc text-left">
            You've no prompts yet or prompt is being loaded. Feel free to
            <Link className="blue_gradient" href={"/create-prompt"}>
              {" "}
              create
            </Link>{" "}
            one.
          </p>
        )}

        {data?.map((prompt) => (
          <PromptCard
            handleEdit={(id) => handleEdit && handleEdit(id)}
            handleDelete={(id) => handleDelete && handleDelete(id)}
            post={prompt}
            key={prompt._id}
          />
        ))}
      </div>
    </section>
  );
  ß;
};

export default Profile;
