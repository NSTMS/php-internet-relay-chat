<?php
require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

 if ($_SERVER['REQUEST_METHOD'] === 'DELETE')) {

   $sql = sprint"INSERT INTO messages (username, message) VALUES (?, ?)";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("ss", $username, $message);
   $stmt->execute();
}
$conn->close();
