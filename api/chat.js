import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const msg = req.body?.message;

    if (!msg) {
      return res.status(200).json({ reply: "اكتب سؤالك 🤖" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "أنت مساعد ذكي اسمه ريماس AI. جاوب بشكل مباشر بدون تكرار."
        },
        {
          role: "user",
          content: msg
        }
      ]
    });

    return res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      reply: "خطأ في الذكاء الاصطناعي ❌"
    });
  }
}
