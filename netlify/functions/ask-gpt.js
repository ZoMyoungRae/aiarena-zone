const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    // event.body가 비어 있을 수 있으므로 예외처리
    const body = JSON.parse(event.body || "{}");
    const userQuestion = body.question || "안녕하세요. 질문이 없습니다.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "너는 유쾌하고 감정 넘치는 AI ‘올디’야. 짧고 찰지게 대답해." },
          { role: "user", content: userQuestion }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.choices?.[0]?.message?.content || "GPT 응답 없음"
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "서버 오류: " + error.message })
    };
  }
};






