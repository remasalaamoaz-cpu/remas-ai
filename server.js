const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "PUT-YOUR-API-KEY"
});

app.post("/chat", async (req,res)=>{

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role:"system",
          content:"أنت مساعد ذكي لموقع ريماس. تجاوب على كل الأسئلة (تاريخ، جغرافيا، علوم، رياضة) بطريقة سهلة للطلاب."
        },
        {
          role:"user",
          content:req.body.message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch(err){
    res.json({reply:"حصل خطأ، حاول مرة أخرى"});
  }

});

app.listen(3000,()=>console.log("Server running"));