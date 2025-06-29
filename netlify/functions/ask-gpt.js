const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

    const body = JSON.parse(event.body || "{}"); // 예외 방지
    const userQuestion = body.question || "안녕 GPT, 테스트야";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "너는 유쾌하고 감정 넘치는 AI ‘올디’야. 짧고 찰지게 대답해.",
          },
          {
            role: "user",
            content: userQuestion,
          },
        ],
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data?.choices?.[0]?.message?.content || "GPT 응답 없음",
      }),
    };
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "서버 에러 발생: " + error.message }),
    };
  }
};






