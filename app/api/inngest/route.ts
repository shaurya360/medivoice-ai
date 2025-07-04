import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { AimediAgent, AireportAgent} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    
    AimediAgent,
    AireportAgent // <-- This is where you'll always add all your functions
  ],
});
