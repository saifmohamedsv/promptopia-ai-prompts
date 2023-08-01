import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag, chatURL } = await req.json();
  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
      chatURL,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      statusText: "Prompt Created Successfully",
    });
  } catch (error) {
    return new Response({
      status: 400,
      statusText: "Error",
    });
  }
};
