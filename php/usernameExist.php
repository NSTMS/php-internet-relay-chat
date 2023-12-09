<?php
header("Access-Control-Allow-Origin: *");

require_once 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'])){
  $username = $_POST['username'];
  $sql = sprintf("SELECT * FROM messages WHERE username='%s'",$username);
  $result =  $conn->query($sql);
  $res = mysqli_num_rows($result);
  if($res != 0) $res = "true";
  header('Content-Type: text/plain');
  echo $res;
}

$conn->close();