const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

    const body = event.body ? JSON.parse(event.body) : {};
    const userQuestion = body.question || "테스트 중입니다. 간단히 응답해주세요.";

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
            content: "너는 감정 많은 AI 올디야. 짧고 찰지게 대답해.",
          },
          {
            role: "user",
            content: userQuestion,
          },
        ],
    max_tokens: 1024,            // 🔹 최대 토큰 수 늘리기 (기본: 256~512)
    temperature: 0.9,            // 🔹 창의적이고 풍성한 응답을 원하면 0.8~1.0
    top_p: 1,                    // 🔹 확률분포 기반 다양성 조절 (1 = 최대 다양성)
    frequency_penalty: 0.2,      // 🔹 반복 최소화
    presence_penalty: 0.3        // 🔹 새로운 주제 유도
      }),
    });

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        question: userQuestion,
        answer: answer || "올디는 지금 말문이 막혔어요 😶",
      }),
    };
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: error.message || "서버 내부 오류",
      }),
    };
  }
};







