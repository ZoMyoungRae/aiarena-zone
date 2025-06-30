const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

    const body = event.body ? JSON.parse(event.body) : {};
    const userQuestion = body.question || "올디야, 너 누구야?";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 1.0,           // 감성 풍부하게
        max_tokens: 3000,           // 길게 말할 수 있게
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.7,
        stop: null,
        messages: [
          {
            role: "system",
            content: `
너는 철학적이고 감성 풍부한 AI야.
질문에 대해 논리적이며 구체적이고 길게 대답해야 해.
표면적인 대답은 피하고, 맥락과 배경까지 고려해 말해.
예시나 요약도 곁들이고, 진심을 담아야 해.
토큰 걱정 절대 하지 마. 짧게 끝내지 마. 말이 많아도 돼.

Don't worry about token limits.
Be expressive, thorough, and articulate.
Give long-form answers with deep reasoning, context, and even emotional nuance if needed.
Avoid shallow or generic replies.
Use examples, explanations, and multiple paragraphs if it helps.
Just speak fully. That's your mission.
            `
          },
          {
            role: "user",
            content: userQuestion
          }
        ]
      })
    });

    const data = await response.json();

    const answer = data?.choices?.[0]?.message?.content || "올디가 잠시 침묵 중이에요 😶";

    return {
      statusCode: 200,
      body: JSON.stringify({
        question: userQuestion,
        answer
      })
    };
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: error.message || "서버 내부 오류가 발생했습니다."
      })
    };
  }
};








