export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { prompt } = req.body;
  
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        }),
      });
  
      const data = await openaiResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  