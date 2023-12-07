<?php
header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST'
   and isset($_POST['username'])
   and isset($_POST['message'])
   and isset($_POST['color'])
) {
  $username = $_POST['username'];
  $message = $_POST['message'];
  $color = $_POST['color'];
  $timestamp =  time() * 1000;

  $sql = "INSERT INTO messages (username, message, color, timestamp) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssss", $username, $message, $color, $timestamp);
  $stmt->execute();
}
$conn->close();
