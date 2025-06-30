import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetail;
};

const ViewReportDialog = ({ record }: Props) => {
    const report = record.report;
    console.log(report);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"link"} size={"sm"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-2xl">
              Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10">
              <h2 className="font-bold text-blue-500">Session Info:</h2>
              <div className="grid grid-cols-2">
                <div>
                    <h2><span className="font-bold">Doctor:</span> {record.selectedDoctor.specialist}</h2>
                    <h2 className="font-bold">Consulted On:{moment(new Date(record.createdOn)).fromNow()}</h2>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
