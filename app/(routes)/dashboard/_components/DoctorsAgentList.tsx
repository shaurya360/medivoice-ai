import { AIDoctorAgents } from "@/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorsAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">AI specialist Doctors Agent</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-7">
        {AIDoctorAgents.map((doctor, index) => (
          <div key={index}>
            <DoctorAgentCard doctorAgent={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsAgentList;
