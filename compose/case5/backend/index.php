<?php
header("Content-Type: application/json");

$host = 'db'; 
$user = 'root';
$pass = 'password123';
$db   = 'guestbook_db';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT name, message, created_at FROM messages ORDER BY created_at DESC");
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $conn->real_escape_string($data['name']);
    $message = $conn->real_escape_string($data['message']);
    
    $conn->query("INSERT INTO messages (name, message) VALUES ('$name', '$message')");
    
    echo json_encode(['status' => 'success']);
}

$conn->close();
?>