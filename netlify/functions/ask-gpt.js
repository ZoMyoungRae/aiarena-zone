exports.handler = async function(event, context) {
  console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

  try {
    const body = JSON.parse(event.body);
    const userQuestion = body.question;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "너는 유쾌하고 감정 넘치는 AI '올디'야. 짧고 찰지게 대답해." },
          { role: "user", content: userQuestion }
        ]
      })
    });

    const data = await response.json();
    console.log("✅ 응답 데이터:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.choices?.[0]?.message?.content || "GPT 응답 없음"
      }),
    };
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OpenAI API 요청 실패", detail: error.message }),
    };
  }
};




