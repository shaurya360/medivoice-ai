"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../medical-agent/[sessionId]/page";





function AddNewSessionDialog() {
  const [note, setNote] = React.useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const router = useRouter();
  const {has} = useAuth();
  const paidUser=has&&has({plan:'Pro'})
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [historyList, setHistorylist] = React.useState<SessionDetail[]>([]);
  const OnClickNext = async () => {
    // console.log("kya hua")
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });
    // console.log("agaya bc")
    // console.log(result.data)
    setSuggestedDoctors(result.data);
    // console.log(suggestedDoctors)
    setLoading(false);
  };
  const onStartConsultation = async () => {
    setLoading(true);

    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };

  useEffect(() => {
      GetHistoryList();
    }, []);
  
    const GetHistoryList = async () => {
      const result = await axios.get("/api/session-chat?sessionId=all");
      // console.log(result.data);
      setHistorylist(result.data);
      setLoading(false);
      
    };
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button className=" mt-2" disabled={!paidUser && historyList?.length>=10}>
          Start Consultation
          <IconArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2>Add Symptoms or Any Other details</h2>
                <Textarea
                  placeholder="Add details...."
                  className="h-[200px] mt-4"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2>Select the Doctor</h2>
                <div className="grid grid-cols-3 gap-5 mt-3">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctorCard
                      doctorAgent={doctor}
                      key={index}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      // @ts-ignore
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button disabled={!note || loading} onClick={OnClickNext}>
              Next
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor || loading}
              onClick={() => onStartConsultation()}
            >
              Start Consultation
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
