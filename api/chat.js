export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ reply: "ابعت سؤال 🤖" });
    }

    const msg = req.body?.message || "";

    // رد تجريبي مؤقت (للتأكد إن السيرفر شغال)
    return res.status(200).json({
      reply: "أنا ريماس AI 🤖 استلمت: " + msg
    });

  } catch (err) {
    return res.status(500).json({
      reply: "خطأ في السيرفر ❌"
    });
  }
}
