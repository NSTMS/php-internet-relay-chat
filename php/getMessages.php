<?php
require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' and isset($_POST['timestamp'])) {
   $lastSync = $_POST['timestamp'];
   $sql = sprintf("SELECT username, message,color, timestamp FROM messages ORDER BY timestamp DESC WHERE timestamp >=%",$lastSync);
   $result = $conn->query($sql);

   $messages = array();
   if ($result->num_rows > 0) {
       while($row = $result->fetch_assoc()) {
           $messages[] = $row;
       }
   }
   echo json_encode($messages);
}
$conn->close();

