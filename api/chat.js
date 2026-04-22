export default async function handler(req, res) {
  try {
    const msg = req.body?.message || "";

    // رد ذكي بسيط (بدون API خارجي)
    const reply = generateAnswer(msg);

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({
      reply: "حصل خطأ في السيرفر ❌"
    });
  }
}

// عقل بسيط يجاوب أي سؤال بشكل عام
function generateAnswer(text) {
  text = text.toLowerCase();

  if (!text) return "اكتب سؤال من فضلك 🤖";

  if (text.includes("من هو") || text.includes("ما هو")) {
    return "سؤال جميل 🤖 ابحث عنه أو وضحه أكثر وسأساعدك.";
  }

  if (text.includes("عاصمة")) {
    return "العواصم تختلف حسب الدولة، اذكر اسم الدولة وسأجيبك 🇺🇳";
  }

  if (text.includes("2+2")) {
    return "2 + 2 = 4";
  }

  return "أنا ريماس AI 🤖 فهمت سؤالك: " + text + " - وحاليًا أتعلم لأجيب بشكل أدق.";
}
