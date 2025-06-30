import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
//   console.log(notes);
//   console.log("req");
  try {
    // console.log("req1");
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content: JSON.stringify(AIDoctorAgents),
        },
        {
          role: "user",
          content:
            "User Notes/Symptoms:" +
            notes +
            ",Depends on user notes and symptoms,please Suggest list of doctors,Return Objects in JSON only",
        },
      ],
    });
    // console.log("req2");
    const response = completion.choices[0].message.content || "";
    // @ts-ignore
    const Resp = response.trim().replace("```json", "").replace("```", "");
    const jsonresp = JSON.parse(Resp);
    return NextResponse.json(jsonresp);
    // console.log("result ");
    // return NextResponse.json(AIDoctorAgents);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
