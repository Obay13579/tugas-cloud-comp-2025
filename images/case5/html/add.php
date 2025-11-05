<?php
$data = ['title' => $_POST['title'], 'url' => $_POST['url']];
$file = 'bookmarks.json';

$bookmarks = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$bookmarks[] = $data;

file_put_contents($file, json_encode($bookmarks, JSON_PRETTY_PRINT));
header("Location: index.php");
?>
