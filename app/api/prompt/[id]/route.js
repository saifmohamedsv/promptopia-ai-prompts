import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (_, { params: { id } }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params: { id } }) => {
  const updatQuery = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = updatQuery.prompt;
    existingPrompt.tag = updatQuery.tag;
    existingPrompt.chatURL = updatQuery.chatURL;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (_, { params: { id } }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndRemove(id);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
