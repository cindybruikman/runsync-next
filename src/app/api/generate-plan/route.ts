import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { distance, weeks, level, daysPerWeek, preferredDays } = await req.json();

  const formattedDays = preferredDays && preferredDays.length
    ? `Preferred running days are: ${preferredDays.join(", ")}.`
    : "";

  const prompt = `
Create a ${weeks}-week running plan for a ${level} runner.
The goal is to complete ${distance} in a strong time.
The runner prefers to train ${daysPerWeek} days per week. ${formattedDays}
Each week must include 7 days with a title, description, and estimated duration in minutes.
If it's a rest day, make that clear in the title and set duration to 0.
Respond in clean JSON like this:

[
  {
    "title": "Easy Run",
    "description": "Relaxed pace to get started",
    "duration": "30 min"
  },
  ...
]
`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "You are a professional running coach." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const result = chat.choices[0].message.content;

    if (!result) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(result);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
