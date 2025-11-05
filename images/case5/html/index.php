<?php
$bookmarks = file_exists("bookmarks.json") ? json_decode(file_get_contents("bookmarks.json"), true) : [];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Bookmark Server</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>📚 Bookmark List</h2>
    <ul>
        <?php foreach ($bookmarks as $b): ?>
            <li><a href="<?= htmlspecialchars($b['url']) ?>" target="_blank"><?= htmlspecialchars($b['title']) ?></a></li>
        <?php endforeach; ?>
    </ul>
    <hr>
    <h3>Add New Bookmark</h3>
    <form action="add.php" method="post">
        Title: <input type="text" name="title"><br>
        URL: <input type="url" name="url"><br>
        <input type="submit" value="Save">
    </form>
</body>
</html>
