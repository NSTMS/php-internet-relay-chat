<?php
require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

 if ($_SERVER['REQUEST_METHOD'] === 'DELETE')) {
   $sql = "DELETE FROM messages where ";
   $stmt = $conn->prepare($sql);
   $stmt->execute();
}
$conn->close();
