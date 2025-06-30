"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

const HistoryList = () => {
  const [historyList, setHistorylist] = React.useState<SessionDetail[]>([]);
  const [loading, setLoading] = React.useState(true);

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
    <div className="mt-10">
      {loading ? (
        <div className="flex items-center justify-center p-7">
          {/* Replace with your actual spinning loader component or SVG/CSS */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          {/* Or your custom Loader component: <Loader /> */}
        </div>
      ) : historyList.length == 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl">
          <Image src={"/ass.jpg"} alt="empty" width={200} height={200} />
          <h2 className="font-bold text-2xl mt-2 ">No Recent Consultation</h2>
          <p className="mb-3">
            It looks like you haven't consulted with us so far
          </p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
