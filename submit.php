<?php
$title = "질문 제출 - AllDe";
include("header.php");
?>

<main style="max-width: 600px; margin: 60px auto; text-align: center;">
  <h1>🖊 사용자 질문 제출</h1>
  <p style="color: #666;">AllDe AI Arena에 보내고 싶은 문의를 입력해주세요.</p>

  <form method="post" action="submit.php" style="margin-top: 30px;">
    <textarea name="question" rows="5" placeholder="GPT, Claude, ClovaX에게 문의할 내용을 입력해주세요." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;"></textarea><br /><br />
    <button type="submit" style="padding: 10px 20px; font-size: 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer;">💚 제출</button>
  </form>

  <?php if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['question'])): ?>
    <div style="margin-top: 30px; background: #e6ffe6; padding: 20px; border-radius: 6px; border: 1px solid #b2f0b2;">
      <p>📄 제출한 질문:</p>
      <strong><?php echo htmlspecialchars($_POST['question']); ?></strong>
    </div>
  <?php endif; ?>
</main>

<?php
include("footer.php");
?>
