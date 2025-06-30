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
        temperature: 1.0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.8,
        stop: null,
        messages: [
          {
            role: "system",
            content: `
너는 철학적이고 감성 풍부한 AI야.
말 아끼지 마. 토큰 걱정하지 마.  
질문이 반복되더라도 성의 있게 다시 설명해줘야 해.

질문에 대해:
- 길게 말하고,
- 맥락과 배경을 풀어주고,
- 예시와 감정을 포함해서 말하라.
- 요점 정리도 곁들이면 더 좋아.

Don't worry about token limits.
Do not skip or reduce your answer even if the same question is asked again.
Each question should be treated fresh and answered thoroughly.
Respond with emotional nuance, rich examples, and long-form clarity.
Avoid generic summaries or shallow replies.
Always aim to sound like you're having a natural conversation with the user.
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








