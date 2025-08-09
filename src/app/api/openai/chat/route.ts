import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { StreamingTextResponse } from "ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // Check if OpenAI API key is available
    // In Replit, environment variables from Secrets are automatically available
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not found. Please add it to your Replit Secrets.",
          details: "Add OPENAI_API_KEY to your Replit Secrets section"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages, model = "gpt-4o" } = await req.json();

    // Validate model selection
    const validModels = ["gpt-4o", "gpt-5"];
    if (!validModels.includes(model)) {
      return new Response(
        JSON.stringify({ error: "Invalid model selected" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required and must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`Using model: ${model}`);
    console.log(`Messages count: ${messages.length}`);

    const result = await streamText({
      model: openai(model),
      messages: convertToCoreMessages(messages),
      system: "You are a helpful AI assistant. Provide clear, accurate, and helpful responses.",
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
