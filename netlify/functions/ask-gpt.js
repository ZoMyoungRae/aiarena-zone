const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

  // 1. 요청 body가 없으면 빈 객체로 초기화 (예외 방지)
  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format in request body" })
    };
  }

  const userQuestion = body.question;

  // 2. 질문이 없으면 종료
  if (!userQuestion) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'question' in request body" })
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",  // 또는 gpt-4, gpt-3.5-turbo 등
        messages: [
          {
            role: "system",
            content: "너는 유쾌하고 감정 넘치는 AI '올디'야. 짧고 찰지게 대답해."
          },
          {
            role: "user",
            content: userQuestion
          }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.choices?.[0]?.message?.content || "🤖 GPT 응답 없음"
      })
    };
  } catch (err) {
    console.error("🔥 GPT 요청 실패:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GPT API 요청 실패" })
    };
  }
};





