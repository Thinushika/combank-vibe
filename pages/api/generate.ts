import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: { body: {
  [x: string]: string; question: string; 
}; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: { message: string; } | { message: string; } | { message: string; }; result?: string | undefined; }): void; new(): any; }; }; }) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const name = req.body.name || '';
  const age = req.body.age || '';
  const location = req.body.location || '';
  const ambition = req.body.ambition || '';

//   console.log(location, ambition)

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Friendly give addvise to following question:
      My name is ${name} 
      I'm ${age} years old. 
      I want to be ${ambition} of ${location}. 
      I live in ${location}.
      what should I do to achive my goal In my country. `,
      temperature: 0.6,
      max_tokens: 250
    });
    console.log("AI : ", completion.data.choices[0].text)
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
  }
}
