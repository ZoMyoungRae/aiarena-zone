exports.handler = async function (event, context) {
  console.log("📦 환경변수 확인:", process.env.OPENAI_API_KEY);

  const body = JSON.parse(event.body);
  const userQuestion = body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // gpt-4, gpt-4o, gpt-3.5-turbo 중 선택 가능
        messages: [
          { role: "system", content: "너는 유쾌하고 감정 넘치는 AI '올디'야. 짧고 찰지게 대답해." },
          { role: "user", content: userQuestion }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenAI API 호출 실패:", errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ answer: "❌ GPT 응답 실패: API 호출 오류" })
      };
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "❌ GPT 응답 없음";

    return {
      statusCode: 200,
      body: JSON.stringify({ answer })
    };

  } catch (err) {
    console.error("❌ 처리 중 에러 발생:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "❌ 서버 내부 오류가 발생했습니다." })
    };
  }
};




