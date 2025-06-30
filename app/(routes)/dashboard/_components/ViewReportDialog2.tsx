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

interface Props {
  record: SessionDetail;
}

const ViewReportDialog = ({ record }: Props) => {
  const obj = JSON.stringify(record.report);
  const res = JSON.parse(obj);
  console.log(res);
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
            <div className="space-y-6 mt-6">
              {/* Session Info */}
              <section>
                <h2 className="font-bold text-blue-500">Session Info:</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <h2 className="font-bold">
                    <span className="text-gray-600">Doctor: </span>
                    {record.selectedDoctor.specialist}
                  </h2>

                  <h2 className="font-bold">
                    <span className="text-gray-600">Consulted On: </span>
                    {moment(new Date(record.createdOn)).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </h2>
                </div>
              </section>

              {/* Chief Complaint */}
              <section>
                <h2 className="font-bold text-blue-500">Chief Complaint:</h2>
                <p className="mt-1 text-gray-700">{res.chiefComplaint}</p>
              </section>

              {/* Summary */}
              <section>
                <h2 className="font-bold text-blue-500">Summary:</h2>
                <p className="mt-1 text-gray-700">{res.summary}</p>
              </section>

              {/* Symptoms */}
              <section>
                <h2 className="font-bold text-blue-500">Symptoms:</h2>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {res.symptoms.map(
                    (
                      symptom:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <li key={index}>{symptom}</li>
                    )
                  )}
                </ul>
              </section>
              {/* Duration & Severity */}
              <section>
                <h2 className="font-bold text-blue-500">
                  Duration & Severity:
                </h2>
                <div className="flex gap-4 mt-1 text-gray-700">
                  <span>
                    <span className="font-semibold">Duration:</span>{" "}
                    {res.duration}
                  </span>
                  <span>
                    <span className="font-semibold">Severity:</span>{" "}
                    {res.severity}
                  </span>
                </div>
              </section>

              {/* Medications Mentioned */}
              <section>
                <h2 className="font-bold text-blue-500">
                  Medications Mentioned:
                </h2>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {res.medicationsMentioned.map(
                    (
                      med:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <li key={index}>{med}</li>
                    )
                  )}
                </ul>
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="font-bold text-blue-500">Recommendations:</h2>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {res.recommendations.map(
                    (
                      item:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
