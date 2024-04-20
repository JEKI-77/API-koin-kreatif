import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj-P8BU4cksoF12Aga2OBxbT3BlbkFJnb6H85WHsWxBvUY2drJ2",
});

async function chat(req, res) {
  const { message } = req.body; // Extract the message content from the request body
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    res.json(completion.choices[0]); // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export default chat;
