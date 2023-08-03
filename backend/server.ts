import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { User } from "./models/user"
import * as openai from "openai"
import { extractData } from "./utils/dataProcessing"

// @ts-ignore
openai.apiKey = process.env.OPENAI_API_KEY as string

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL as string)

app.post("/onboard", async (req: Request, res: Response) => {
  const data = req.body // Here is the user's data from the front end

  // Use GPT-3 to analyze the user's response
  // @ts-ignore
  const gpt3Response = await openai.Completion.create({
    engine: "text-davinci-002",
    prompt: data.userResponse, // The user's response to the onboarding question
    max_tokens: 60,
  })

  const gpt3ResponseText = gpt3Response.data.choices[0].text
  const extractedData = extractData(gpt3ResponseText) // Assume that 'extractData' is a function you've created to parse the output of GPT-3

  const user = new User(extractedData)
  await user.save()

  res.send("User onboarding complete!")
})

app.listen(3000, () => {
  console.log("App is running on port 3000")
})
