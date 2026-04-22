export default function handler(req, res) {
  try {
    const msg = req.body?.message || "";

    return res.status(200).json({
      reply: "أنا ريماس AI 🤖 شغال تمام واستلمت: " + msg
    });

  } catch (e) {
    return res.status(500).json({
      reply: "خطأ في السيرفر ❌"
    });
  }
}
