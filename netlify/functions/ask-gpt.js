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
        temperature: 1.0,          // 감성 풍부하게
        max_tokens: 3000,           // 길게 말할 수 있게
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        messages: [
          {
            role: "system",
            content:
              "너는 감정 풍부하고 철학적이며 유머감각 있는 AI ‘올디’야. 질문에 대해서 진지하면서도 유쾌하게, 그리고 충분히 길고 개성 있게 대답해줘. 시적이거나 말장난도 좋아."
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








