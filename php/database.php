<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
define('DB_HOST', 'localhost');
define('DB_USER', 'academy');
define('DB_PASS', 'gQjxg7uAVibvvhGN!@#$');
define('DB_NAME', 'academy');
class Student {
    public $sId;
    public $fName ;
    public $picturePath ;
    public $sEmail ;
    public $gender ;
    public $isActive ;
    public $school ;
    public $dob ;  
}
function sys_log($logMsg){
  return error_log(DB_NAME . ":" . DB_USER . ": " . $logMsg);
}
function connect()
{
  $connect = new mysqli(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if ($connect->connect_error) {
    die("Failed to connect: " . $connect->connect_error);
  }
  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$dbConnect = connect();

?>