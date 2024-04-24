import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj-P8BU4cksoF12Aga2OBxbT3BlbkFJnb6H85WHsWxBvUY2drJ2",
});

async function chat(req, res) {
  const { message } = req.body;
  res.setHeader("Content-Type", "application/json"); // Set header to application/json
  try {
    let response = ""; // Initialize response variable
    const stream = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
      stream: true,
    });
    for await (const chunk of stream) {
      const chunkContent = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(chunkContent);
      response += chunkContent; // Append chunk to response
      // Send the chunk back to the client immediately
      res.write(chunk.choices[0]?.delta.content || "");
    }
    // End the response stream
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export default chat;
