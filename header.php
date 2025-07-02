<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($title) ? $title : 'AllDe AI Arena'; ?></title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    header {
      background-color: #222;
      color: white;
      padding: 10px 20px;
    }
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .top-nav a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
      font-weight: bold;
    }
    .top-nav a:hover {
      text-decoration: underline;
    }
    main {
      padding: 20px;
    }
  </style>
</head>
<body>
  <header>
    <div class="top-nav">
      <div><a href="index.php">🌟 AllDe</a></div>
      <nav>
        <a href="compare.php">비교하기</a>
        <a href="k-ai-zone.php">K-AI Zone</a>
        <a href="submit.php">질문제출</a>
      </nav>
    </div>
  </header>
