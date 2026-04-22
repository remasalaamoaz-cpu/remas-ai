import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "POST only" });
    }

    const msg = req.body?.message;
    const history = req.body?.history || [];

    if (!msg) {
      return res.status(200).json({ reply: "اكتب سؤالك 🤖" });
    }

    const messages = [
      {
        role: "system",
        content: "أنت مساعد ذكي اسمه ريماس AI تجيب على أي سؤال بالعربية بطريقة بسيطة وواضحة."
      }
    ];

    history.forEach(h => messages.push(h));

    messages.push({
      role: "user",
      content: msg
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages
    });

    return res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      reply: "خطأ في السيرفر ❌"
    });
  }
}
