// "use client";
// import axios from "axios";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { doctorAgent } from "../../_components/DoctorAgentCard";
// import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Vapi from "@vapi-ai/web";
// import { toast } from "sonner";

// export type SessionDetail = {
//   id: number;
//   notes: string;
//   sessionId: string;
//   report: JSON;
//   selectedDoctor: doctorAgent;
//   createdOn: string;
// };

// type messages = {
//   role: string;
//   text: string;
// };

// const MedicalVoiceAgent = () => {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = React.useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<any>();
//   const [currentRole, setCurrentRole] = useState<string | null>();
//   const [liveTranscript, setLiveTranscript] = useState<string>();
//   const [messages, setMessages] = useState<messages[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (sessionId) GetSessionDetails();
//   }, [sessionId]);

//   const GetSessionDetails = async () => {
//     // console.log("doctor ka data mangwara hun")
//     const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//     // console.log(result.data);
//     setSessionDetail(result.data);
//   };

//   const StartCall = () => {
//     setLoading(true);
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

//     setVapiInstance(vapi);
//     // const VapiAgentConfig = {
//     //   name: "AI Medical Doctor Voice Agent",
//     //   firstMessage:
//     //     "Hi there!,I'm your Ai Medical Assistant.I'm here to help you with any health questions or concerns you might have.How are you feeling today?",
//     //   transcriber: {
//     //     provider: "assembly-ai",
//     //     language: "en",
//     //   },
//     //   voice: {
//     //     provider: "Vapi",
//     //     voiceId: "elliot",
//     //   },
//     //   model: {
//     //     provider: "openai",
//     //     model: "gpt-4",
//     //     messages: [
//     //       {
//     //         role: "system",
//     //         content: sessionDetail?.selectedDoctor?.agentPrompt,
//     //       },
//     //     ],
//     //   },
//     // };

//     // @ts-ignore
//     vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);

//     vapi.on("call-start", () => {
//       console.log("Call started");
//       setLoading(false);
//       setCallStarted(true);
//     });
//     vapi.on("call-end", () => {
//       console.log("Call ended");
//       setLoading(false);
//       setCallStarted(false);
//     });
//     vapi.on("message", (message) => {
//       if (message.type === "transcript") {
//         const { role, transcriptType, transcript } = message;
//         console.log(`${message.role}: ${message.transcript}`);
//         if (transcriptType == "partial") {
//           setLiveTranscript(transcript);
//           setCurrentRole(role);
//         } else if (transcriptType == "final") {
//           setMessages((prev: any) => [
//             ...prev,
//             { role: role, text: transcript },
//           ]);
//           setLiveTranscript("");
//           setCurrentRole(null);
//         }
//       }
//     });
//     vapiInstance?.on("speech-start", () => {
//       console.log("Assistant started speaking");
//       setCurrentRole("assistant");
//     });
//     vapiInstance?.on("speech-end", () => {
//       console.log("Assistant stopped speaking");
//       setCurrentRole("user");
//     });
//   };

//   const endCall = async () => {
//     console.log("report bana bc");
//     setLoading(true);
//     const result = await GenerateReport();
//      console.log("report bana bc2");
//      setCallStarted(false);
//     setVapiInstance(null);
//     toast.success("your report is generated");
//     router.replace("/dashboard");
//     if (!vapiInstance) return;
//     vapiInstance.stop();
    
//     setLoading(false);
//   };

//   const GenerateReport = async () => {
//     setLoading(true);
//     const result = await axios.post("/api/medical-report", {
//       messages: messages,
//       sessionDetail: sessionDetail,
//       sessionId: sessionId,
//     });
//     console.log(result.data);
//     setLoading(false);
//     return result.data;
//   };

//   const [callTime, setCallTime] = useState(0);

// useEffect(() => {
//   let timer: NodeJS.Timeout;

//   if (callStarted) {
//     timer = setInterval(() => {
//       setCallTime((prevTime) => prevTime + 1);
//     }, 1000);
//   } else {
//     setCallTime(0); // Reset time when call ends
//   }

//   return () => clearInterval(timer);
// }, [callStarted]);

// const formatTime = (totalSeconds: number) => {
//   const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
//   const seconds = String(totalSeconds % 60).padStart(2, "0");
//   return `${minutes}:${seconds}`;
// };

//   return (
//     <div className="p-5 border rounded-3xl bg-secondary">
//       <div className="flex justify-between items-center">
//         <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           <Circle
//             className={`h-4 w-4  rounded-full ${
//               callStarted ? "bg-green-500" : "bg-red-500"
//             }`}
//           />
//           {callStarted ? "Connected" : "Not Connected"}
//         </h2>
//         <h2 className="font-bold text-xl text-gray-400">{formatTime(callTime)}</h2>
//       </div>
//       {sessionDetail && (
//         <div className="flex items-center flex-col mt-10">
//           <Image
//             src={sessionDetail?.selectedDoctor?.image || ''}
//             alt={sessionDetail?.selectedDoctor?.specialist}
//             height={80}
//             width={80}
//             className="h-[100px] w-[100px] object-contain rounded-full"
//           />
//           <h2 className="mt-2 text-lg">
//             {sessionDetail?.selectedDoctor?.specialist}
//           </h2>
//           <p className="text-sm text-gray-400">AI Medical Voice Agent</p>
//           <p className="text-sm text-black">Please ensure your mic is properly connected </p>
//           <div className="mt-3 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
//             {messages?.slice(-4).map((msg: messages, index) => (
//               <h2 className="text-gray-400 p-2" key={index}>
//                 {msg.role}:{msg.text}
//               </h2>
//             ))}
//             {liveTranscript && liveTranscript?.length > 0 && (
//               <h2>
//                 {currentRole}:{liveTranscript}
//               </h2>
//             )}
//           </div>
//           {!callStarted ? (
//             <Button className="mt-20" onClick={StartCall} disabled={loading}>
//               {loading ? <Loader className="animate-spin" /> : <PhoneCall />}{" "}
//               "Start Call"
//             </Button>
//           ) : (
//             <Button
//               variant={"destructive"}
//               onClick={endCall}
//               disabled={loading}
//             >
//               {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
//               Disconnect
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalVoiceAgent;

"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callTime, setCallTime] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    setSessionDetail(result.data);
  };

  const checkMicPermission = async (): Promise<boolean> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser does not support microphone access.");
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      setError("Microphone access denied. Please check your mic or refresh the page.");
      return false;
    }
  };

  const StartCall = async () => {
    setLoading(true);
    setError(null); // Clear previous error

    const micAllowed = await checkMicPermission();
    if (!micAllowed) {
      setLoading(false);
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);

    vapi.on("call-start", () => {
      console.log("Call started");
      setLoading(false);
      setCallStarted(true);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setLoading(false);
      setCallStarted(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;

        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    vapi.on("speech-start", () => {
      setCurrentRole("assistant");
    });

    vapi.on("speech-end", () => {
      setCurrentRole("user");
    });
  };

  const endCall = async () => {
    setLoading(true);
    const result = await GenerateReport();
    setCallStarted(false);
    setVapiInstance(null);
    toast.success("Your report is generated");
    router.replace("/dashboard");

    if (vapiInstance) {
      vapiInstance.stop();
    }

    setLoading(false);
  };

  const GenerateReport = async () => {
    setLoading(true);
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
    setLoading(false);
    return result.data;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (callStarted) {
      timer = setInterval(() => {
        setCallTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setCallTime(0);
    }

    return () => clearInterval(timer);
  }, [callStarted]);

  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">
          {formatTime(callTime)}
        </h2>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4 text-sm">
          {error}
        </div>
      )}

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image || ""}
            alt={sessionDetail?.selectedDoctor?.specialist}
            height={80}
            width={80}
            className="h-[100px] w-[100px] object-contain rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>
          <p className="text-sm text-black">
            Please ensure your mic is properly connected
          </p>

          <div className="mt-3 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role}: {msg.text}
              </h2>
            ))}
            {liveTranscript && (
              <h2>
                {currentRole}: {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalVoiceAgent;

