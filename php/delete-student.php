<?php

require 'database.php';

// Extract, validate and sanitize the id.
$sId = ($_GET['sId'] !== null && (int)$_GET['sId'] > 0)? mysqli_real_escape_string($con, (int)$_GET['sId']) : false;
if(!$sId){
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `students` WHERE `sid` ='{$sId}' LIMIT 1";
sys_log("DELETE SQL: " . $sql);
if($dbConnect->query($sql)) {
  sys_log("DELETE-SUCCESS.");
  http_response_code(204);
} else {
  sys_log("DELETE-ERROR 422: " . $dbConnect->error );
  return http_response_code(422);
}
$dbConnect->close();
?>