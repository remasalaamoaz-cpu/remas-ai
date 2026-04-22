export default function handler(req, res) {
  const msg = req.body?.message || "";

  res.status(200).json({
    reply: "أنا ريماس AI 🤖 قلت: " + msg
  });
}
