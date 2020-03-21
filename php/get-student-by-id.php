<?php
require 'database.php';
// Get the posted data.

$sId = (int) htmlspecialchars($_GET["sId"]) ;
if(isset($sId) && !empty($sId) && $sId > 0) {
  $sql = "SELECT `sId`,`fName`, `sGender`, `sEmail`, `sStatus`,`school`, `picturePath`, `sDOB` FROM `students` WHERE `sId`  = {$sId} LIMIT 1";
  error_log(DB_NAME . ": SQL SELECT BY ID:" . $sql);
  $result = $dbConnect->query($sql);
  if($result->num_rows > 0) {
           if ($row = $result->fetch_assoc()) {

             $student = new Student();
             
             $student->sId = $row['sId'];
             $student->fName = $row['fName'];
             $student->picturePath = $row['picturePath'];
             $student->sEmail = $row['sEmail'];
             $student->gender = $row['sGender'];
             $student->isActive = $row['sStatus'];
             $student->school = $row['school'];
             $student->dob = $row['sDOB'];
             
            echo json_encode($student);
        }
        } else {
            return http_response_code(422);   
        }
} 


$dbConnect->close();
?>