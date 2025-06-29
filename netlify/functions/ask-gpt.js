const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

    const body = event.body ? JSON.parse(event.body) : {};
    const userQuestion = body.question || "지금은 테스트 중입니다. 간단히 응답해 주세요.";

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
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    const answer = data?.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        question: userQuestion,
        answer: answer || "올디는 잠시 조용한 상태입니다. 다시 시도해 주세요.",
      }),
    };
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: error.message || "알 수 없는 에러 발생",
      }),
    };
  }
};







