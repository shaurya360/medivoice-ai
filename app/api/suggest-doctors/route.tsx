import { openai } from "@/config/OpenAiModel";
import { inngest } from "@/inngest/client";
import { AIDoctorAgents } from "@/list";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { notes } = await req.json();
//   console.log(notes);
//   console.log("req2");
//   try {
//     // console.log("req3");
//     const completion = await openai.chat.completions.create({
//       model: "openrouter/cypher-alpha:free",
//       messages: [
//         {
//           role: "system",
//           content: JSON.stringify(AIDoctorAgents),
//         },
//         {
//           role: "user",
//           content:
//             "User Notes/Symptoms:" +
//             notes +
//             ",Depends on user notes and symptoms,please Suggest list of doctors,Return Objects in JSON only",
//         },
//       ],
//     });
//     // console.log("req4");
//     const response = completion.choices[0].message.content || "";
//     // console.log(response);
//     // @ts-ignore
//     const Resp = response.trim().replace("```json", "").replace("```", "");
//     // console.log(Resp);
//     const jsonresp = JSON.parse(Resp);
//     // console.log("req5");
//     return NextResponse.json(jsonresp);
//     // console.log("result ");
//     // return NextResponse.json(AIDoctorAgents);
//   } 
  
//   catch (e) {
//     // console.log("req6");
//     // console.log(e);
//     return NextResponse.json(e);
//   }
// }

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try{
    const resultIds = await inngest.send({
        name:'AimediAgent',
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
    console.log(runStatus.data?.[0].output?.output[0])
    return NextResponse.json(runStatus.data?.[0].output?.output[0])
  }
  catch(e){
    console.log(e)
    return NextResponse.json(e);
  }
  
    
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
  
  
  

