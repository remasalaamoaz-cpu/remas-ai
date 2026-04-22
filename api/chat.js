export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ reply: "ابعت سؤال 🤖" });
    }

    const msg = req.body?.message || "";

    if (!msg.trim()) {
      return res.status(200).json({ reply: "اكتب سؤالك الأول 👇" });
    }

    // رد بسيط ثابت (مضمون 100% بدون أخطاء API)
    return res.status(200).json({
      reply: "أنا ريماس AI 🤖 فهمت سؤالك: " + msg
    });

  } catch (e) {
    return res.status(500).json({
      reply: "خطأ في السيرفر ❌"
    });
  }
}
