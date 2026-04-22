import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // حماية من الطلبات الغلط
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method Not Allowed"
    });
  }

  try {
    const msg = req.body?.message;

    if (!msg || msg.trim().length === 0) {
      return res.status(200).json({
        reply: "اكتب سؤالك الأول 🤖"
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
أنت مساعد ذكي اسمه "ريماس AI".
تجيب على أي سؤال في كل المجالات (تعليم، تاريخ، علوم، رياضة، تقنية).
الإجابات تكون:
- صحيحة قدر الإمكان
- مختصرة وواضحة
- باللغة العربية
- بدون حشو أو تكرار
`
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

  } catch (error) {
    return res.status(500).json({
      reply: "حصل خطأ مؤقت في السيرفر ❌ حاول مرة أخرى"
    });
  }
}
