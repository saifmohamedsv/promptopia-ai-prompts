import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    const newPrompts = prompts.map((doc) => doc).sort();

    return new Response(JSON.stringify(newPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
