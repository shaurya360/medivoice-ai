"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired:boolean
};
type doctorAgentProps = {
  doctorAgent: doctorAgent;
};

const DoctorAgentCard = ({ doctorAgent }: doctorAgentProps) => {
  const {has} = useAuth();
  const paidUser=has&&has({plan:'pro'})
  console.log(paidUser);
const [loading, setLoading] = useState(false);
const router = useRouter();
  const onStartConsultation = async () => {
    setLoading(true);

    const result = await axios.post("/api/session-chat", {
      notes: "New Quesry",
      selectedDoctor: doctorAgent,
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };


  return (
    <div className="relative">
      {doctorAgent.subscriptionRequired && <Badge className="absolute m-2 right-0">Premium+</Badge>}
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[230px] object-cover rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 text-sm test-gray-500">
        {doctorAgent.description}
      </p>
      <Button className=" mt-2" disabled={!paidUser&&doctorAgent.subscriptionRequired} onClick={onStartConsultation}>
                Start Consultation
                
                {loading?<Loader2 className="animate-spin"/>:<IconArrowRight />}
      </Button>
      {/* <AddNewSessionDialog/> */}
    </div>
  );
};

export default DoctorAgentCard;
