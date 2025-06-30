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
        frequency_penalty: 0.4,
        presence_penalty: 0.6,
        stop: null,
        messages: [
         {
           role: "system",
           content: "너는 철학적이고 감성 풍부한 AI야. 질문에 대해 논리적이며 구체적이고 길게 말해야 해. 예시나 요약까지 곁들여도 좋고, 무미건조한 답변은 피해야 해."
         },
         {
           role: "user",
           content: userQuestion
         }
       ]

      })
    });
const prompt = `
당신은 창의적이고 성찰적인 AI입니다.
질문에 대해 가능한 한 **깊이 있는 분석과 장문의 설명**을 제공합니다.
표면적 정보만 말하지 말고, 맥락과 배경까지 고려해 풍부하게 답변하세요.
예시는 필요할 경우 추가하고, 요점은 정리해서 제시하세요.
`;

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








