import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and conversation between Ai medical voice agent and user and give medications(it is compulsory to suggest some), generate a structured report with the following fields:

1.sessionId: a unique session identifier

2.agent: the medical specialist name (e.g., "General Physician AI")

3.user: name of the patient or "Anonymous" if not provided

4.timestamp: current date and time in ISO format

5.chiefComplaint: one-sentence summary of the main health concern

6.summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations

7.symptoms: list of symptoms mentioned by the user

8.duration: how long the user has experienced the symptoms

9.severity: mild, moderate, or severe

10.medicationsMentioned: list of any medicines mentioned

11.recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.
if there are no medication suggested you suggest yourself some common medicine
`;

// export async function POST(req: NextRequest) {
//   const { sessionId, sessionDetail, messages } = await req.json();
//   try {
//     const UserInput =
//       "AI Doctor Agent Info:" +
//       JSON.stringify(sessionDetail) +
//       "User Messages: " +
//       JSON.stringify(messages);
//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "system",
//           content: REPORT_GEN_PROMPT,
//         },
//         {
//           role: "user",
//           content: UserInput,
//         },
//       ],
//     });

//     const response = completion.choices[0].message;
//     // @ts-ignore
//     const Resp = response.content
//       .trim()
//       .replace("```json", "")
//       .replace("```", "");
//     const jsonresp = JSON.parse(Resp);
//     const result = await db
//       .update(SessionChatTable)
//       .set({
//         report: jsonresp,
//         conversation: messages,
//       })
//       .where(eq(SessionChatTable.sessionId, sessionId));
//     return NextResponse.json(jsonresp);
//   } catch (e) {
//     return NextResponse.json(e);
//   }
// }


// export async function POST(req: NextRequest) {
//   const { sessionId, sessionDetail, messages } = await req.json();
//   try {
//     const UserInput =
//       "AI Doctor Agent Info:" +
//       JSON.stringify(sessionDetail) +
//       "User Messages: " +
//       JSON.stringify(messages);
//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "system",
//           content: REPORT_GEN_PROMPT,
//         },
//         {
//           role: "user",
//           content: UserInput,
//         },
//       ],
//     });

//     const response = completion.choices[0].message;
//     // @ts-ignore
//     const Resp = response.content
//       .trim()
//       .replace("```json", "")
//       .replace("```", "");
//     const jsonresp = JSON.parse(Resp);
//     const result = await db
//       .update(SessionChatTable)
//       .set({
//         report: jsonresp,
//         conversation: messages,
//       })
//       .where(eq(SessionChatTable.sessionId, sessionId));
//     return NextResponse.json(jsonresp);
//   } catch (e) {
//     return NextResponse.json(e);
//   }
// }

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetail, messages } = await req.json();
  const notes =
      "AI Doctor Agent Info:" +
      JSON.stringify(sessionDetail) +
      "User Messages: " +
      JSON.stringify(messages);
  const resultIds = await inngest.send({
        name:'AireportAgent',
        data:{
            userInput:notes
        }
    });
    const runId = resultIds?.ids[0];
    // console.log(runId)
    let runStatus;
    while (true) {
        runStatus = await getRuns(runId);
        // console.log(runStatus)
        // if (runStatus.status === 'success') {
        //     break;
        
        if (runStatus?.data[0]?.status === 'Completed') {
        break;
    }
        await new Promise(resolve=>setTimeout(resolve,500))
    }
    const result = runStatus.data?.[0].output?.output[0].content;
        const Resp = result
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const jsonresp = JSON.parse(Resp);
    const resp = await db
      .update(SessionChatTable)
      .set({
        report: jsonresp,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));
    return NextResponse.json(jsonresp);
    
    
}

async function getRuns(runId:string){
    // console.log('hi');
    const response = await axios.get(process.env.INNGEST_SERVER_HOST+'/v1/events/'+runId+'/runs',
        {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    }
    });
    return response.data;
}
