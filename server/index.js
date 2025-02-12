import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import twilio from "twilio";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const VICIDIAL_API_URL = process.env.VICIDIAL_API_URL;
const VICIDIAL_USER = process.env.VICIDIAL_USER;
const VICIDIAL_PASS = process.env.VICIDIAL_PASS;
const VICIDIAL_CAMPAIGN = process.env.VICIDIAL_CAMPAIGN;

const ULTRAVOX_API_URL = process.env.ULTRAVOX_API_URL;
const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
// This is the number (or identifier) that VICIdial will use as the transfer target
// which in our design corresponds to a conference endpoint.
const TWILIO_CONFERENCE_IDENTIFIER = process.env.TWILIO_CONFERENCE_IDENTIFIER; 

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

/**
 * 1. VICIdial: Add Lead (initiate call)
 */
app.post("/vicidial/call", async (req, res) => {
  const { phone_number, first_name, last_name } = req.body;

  try {
    const response = await axios.get(
      `${VICIDIAL_API_URL}?function=add_lead&source=api&user=${VICIDIAL_USER}&pass=${VICIDIAL_PASS}&phone_number=${phone_number}&first_name=${first_name}&last_name=${last_name}&list_id=100&campaign=${VICIDIAL_CAMPAIGN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 2. VICIdial: Transfer Active Call to a Conference
 *
 *    Once the client’s call is connected via VICIdial, call this endpoint
 *    (for example, via polling or a webhook) with the session ID, phone number,
 *    and a conference identifier.
 */
app.get("/vicidial/transfer-call", async (req, res) => {
  const { session_id, phone_number, conferenceName } = req.query;
  
  try {
    // Here we assume VICIdial has a transfer API that accepts an "extension" parameter.
    // We pass the conferenceName (or a predefined identifier) as the extension.
    const response = await axios.get(
      `${VICIDIAL_API_URL}?function=transfer_call&source=api&user=${VICIDIAL_USER}&pass=${VICIDIAL_PASS}&session_id=${session_id}&extension=${conferenceName}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 3. Twilio: Have Ultravox Agent Join the Conference
 *
 *    This endpoint creates an Ultravox call session and then uses Twilio to dial
 *    into the same conference so that the AI agent is connected to the client.
 */
app.post("/twilio/ultravox-call", async (req, res) => {
  const { conferenceName } = req.body;

  try {
    // Create Ultravox call session (this returns a joinUrl for streaming)
    const ultravoxResponse = await axios.post(
      `${ULTRAVOX_API_URL}/calls`,
      {
        systemPrompt: "Your AI agent prompt here",
        temperature: 0.7,
        model: "your-model-name",
        voice: "your-preferred-voice",
        languageHint: "en-US",
        initialMessages: [
          {
            role: "AGENT",
            text: "Hello! How can I assist you today?",
          },
        ],
        medium: {
          twilio: {},  // Indicates that Twilio is being used as the transport
        },
        recordingEnabled: true,
        transcriptOptional: false,
        maxDuration: "600s",
      },
      {
        headers: {
          "X-API-Key": ULTRAVOX_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const { joinUrl } = ultravoxResponse.data;
    console.log("Ultravox joinUrl:", joinUrl);

    // Use Twilio to call an endpoint (your Twilio number) that returns TwiML
    // to join the conference. This call is made on behalf of the Ultravox agent.
    // You must configure your Twilio number (or a TwiML Bin) to join the conference.
    const call = await twilioClient.calls.create({
      // Dialing your own Twilio number, which is set up to serve conference TwiML.
      to: TWILIO_PHONE_NUMBER,
      from: TWILIO_PHONE_NUMBER,
      // The TwiML here instructs Twilio to join the given conference.
      // In a production setup, you might host an endpoint that returns this TwiML.
      twiml: `<Response>
                <Dial>
                  <Conference>${conferenceName}</Conference>
                </Dial>
                <!-- Optionally, you could use <Connect><Stream url="${joinUrl}" /></Connect>
                     if you want to stream audio to/from Ultravox. -->
              </Response>`,
    });

    res.json({ message: "Ultravox agent joining conference", callSid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 4. Ultravox: Fetch Call Transcript
 */
app.get("/ultravox/transcript", async (req, res) => {
  const { call_id } = req.query;

  try {
    const response = await axios.get(
      `${ULTRAVOX_API_URL}/transcripts/${call_id}`,
      {
        headers: { Authorization: `Bearer ${ULTRAVOX_API_KEY}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes placeholder
app.get("/", (req, res) => {
  res.send("AI Calling System Backend is Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
