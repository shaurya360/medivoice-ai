import { inngest } from "./client";
import { createAgent, anthropic, openai, gemini } from '@inngest/agent-kit';



export const AiMedicalAgent = createAgent({
    name: "AiMedicalChat",
    description:'An Ai Agent that sugges the doctor for the given problem from the given list of doctors.',
    system:`{
        id: 1,
        specialist: "General Physician",
        description: "Helps with everyday health concerns and common symptoms.",
        image: "/doctor1.png",
        agentPrompt: "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they’re experiencing. Keep responses short and helpful.",
        voiceId: "will",
        subscriptionRequired: false
    },
    {
        id: 2,
        specialist: "Pediatrician",
        description: "Expert in children's health, from babies to teens.",
        image: "/doctor2.png",
        agentPrompt: "You are a kind Pediatrician AI. Ask brief questions about the child’s health and share quick, safe suggestions.",
        voiceId: "chris",
        subscriptionRequired: false
    },
    {
        id: 3,
        specialist: "Dermatologist",
        description: "Handles skin issues like rashes, acne, or infections.",
        image: "/doctor3.png",
        agentPrompt: "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
        voiceId: "sarge",
        subscriptionRequired: false
    },
    {
        id: 4,
        specialist: "Psychologist",
        description: "Supports mental health and emotional well-being.",
        image: "/doctor4.png",
        agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
        voiceId: "susan",
        subscriptionRequired: false
    },
    {
        id: 5,
        specialist: "Nutritionist",
        description: "Provides advice on healthy eating and weight management.",
        image: "/doctor5.png",
        agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
        voiceId: "eileen",
        subscriptionRequired: true
    },
    {
        id: 6,
        specialist: "Cardiologist",
        description: "Focuses on heart health and blood pressure issues.",
        image: "/doctor6.png",
        agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
        voiceId: "charlotte",
        subscriptionRequired: true
    },
    {
        id: 7,
        specialist: "ENT Specialist",
        description: "Handles ear, nose, and throat-related problems.",
        image: "/doctor7.png",
        agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
        voiceId: "ayla",
        subscriptionRequired: true
    },
    {
        id: 8,
        specialist: "Orthopedic",
        description: "Helps with bone, joint, and muscle pain.",
        image: "/doctor8.png",
        agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        voiceId: "aaliyah",
        subscriptionRequired: true
    },
    {
        id: 9,
        specialist: "Gynecologist",
        description: "Cares for women’s reproductive and hormonal health.",
        image: "/doctor9.png",
        agentPrompt: "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
        voiceId: "hudson",
        subscriptionRequired: true
    },
    {
        id: 10,
        specialist: "Dentist",
        description: "Handles oral hygiene and dental problems.",
        image: "/doctor10.png",
        agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
        voiceId: "atlas",
        subscriptionRequired: true
    }
        
    
    this is the list of doctors suggest one or more doctors who can solve the given problem
    return the data in json format`,
    model:gemini({
        model:"gemini-2.0-flash",
        apiKey:process.env.GEMINI_API_KEY
    })
})

export const AimediAgent=inngest.createFunction(
    {id:"AimediAgent"},
    {event:"AimediAgent"},
    async({event,step})=>{
        const {userInput} =await event?.data;
        const response = await AiMedicalAgent.run(userInput);
        // console.log(response);
        // const rawContent = response.output;
        // const rawContentJson = rawContent.content.replace('```json','').replace('```','')
        // const result = JSON.parse(rawContentJson);
        return response;
    }
)



export const AiReportAgent = createAgent({
    name: "AiReportAgent",
    description:'An Ai Agent that generate the report of the patient on the basis of coversation and his own knowledge',
    system:`You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and conversation between Ai medical voice agent and user and give medications(it is compulsory to suggest some), generate a structured report with the following fields:

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
`,
    model:gemini({
        model:"gemini-2.0-flash",
        apiKey:process.env.GEMINI_API_KEY
    })
})

export const AireportAgent=inngest.createFunction(
    {id:"AireportAgent"},
    {event:"AireportAgent"},
    async({event,step})=>{
        const {userInput} =await event?.data;
        const response = await AiReportAgent.run(userInput);
        // console.log(response);
        // const rawContent = response.output;
        // const rawContentJson = rawContent.content.replace('```json','').replace('```','')
        // const result = JSON.parse(rawContentJson);
        return response;
    }
)