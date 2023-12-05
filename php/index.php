<?php
require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' and isset($_POST['timestamp'])) {
   $sql = sprintf("SELECT username, message, timestamp FROM messages ORDER BY timestamp DESC WHERE timestamp >=%",);
   $result = $conn->query($sql);

   $messages = array();
   if ($result->num_rows > 0) {
       while($row = $result->fetch_assoc()) {
           $messages[] = $row;
       }
   }
   echo json_encode($messages);

} else if ($_SERVER['REQUEST_METHOD'] === 'POST' and isset($_POST('username') and isset($_POST('message')) {
   $username = $_POST['username'];
   $message = $_POST['message'];

   $sql = sprintf"INSERT INTO messages (username, message,timestamp) VALUES (?, ?, ?)", $username, $message, date());
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("ss", $username, $message);
   $stmt->execute();
}

$conn->close();
