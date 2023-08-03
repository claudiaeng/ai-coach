import express, { Request, Response } from "express"
import * as openai from "openai"
import { extractData } from "../utils/dataProcessing"

// @ts-ignore
openai.apiKey = process.env.OPENAI_API_KEY as string

const app = express()

app.use(express.json())

app.post("/onboard", async (req: Request, res: Response) => {
  const data = req.body // Here is the user's data from the front end

  // Use GPT-3 to analyze the user's response
  // @ts-ignore
  const gpt3Response = await openai.default.Completion.create({
    engine: "text-davinci-002",
    prompt: data.userResponse, // The user's response to the onboarding question
    max_tokens: 60,
  })

  const gpt3ResponseText = gpt3Response.data.choices[0].text
  const extractedData = extractData(gpt3ResponseText) // Assume that 'extractData' is a function you've created to parse the output of GPT-3

  res.send(extractedData) // Sending the extracted data back to the client
})
