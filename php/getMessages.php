<?php
header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['lastSync'])){
 $messages = array();
 $lastSync = $_GET['lastSync'];
 $sql = sprintf("SELECT username, message,color, timestamp FROM messages WHERE timestamp >=%s ORDER BY timestamp DESC",$lastSync);
 $result = $conn->query($sql);
 while($row = $result->fetch_assoc()){
    array_push($messages, $row);
 }
 $sql = "SELECT * FROM messages";
 $result = $conn->query($sql);
 if(mysqli_num_rows($result) > 250)
 {
    $sql = "DELETE FROM messages LIMIT 100";
    $conn->query($sql);
 }
 header('Content-Type: application/json');
 echo json_encode($messages);
}
$conn->close();




//  $stmt = $conn->prepare("SELECT username, message, color, timestamp FROM `messages` WHERE timestamp >= ? ORDER BY timestamp DESC");
//  $stmt->bind_param("s", $lastSync);
//  $stmt->execute();
//  $result = $stmt->get_result();
//
//  $messages = array();
//  if ($result->num_rows > 0) {
//      while($row = $result->fetch_assoc()) {
//          $messages[] = $row;
//      }
//  }