<?php
header("Access-Control-Allow-Origin: *")
header('Content-Type: text/plain');

require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'])){
  $username = $_POST['username'];
  $sql = sprintf("SELECT * FROM messages WHERE username='%s'",$username);
  $result =  $conn->query($sql);
  $res = "false";
  if(mysqli_num_rows($result) != 0) $res = "true";
  echo $res;
}

$conn->close();