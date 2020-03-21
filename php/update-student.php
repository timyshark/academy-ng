<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  if($request->sId === 0 ) {
   return http_response_code(400);
   }

 $student = new Student();
  // Sanitize.
  $sId = (int)($request->sId);
  $fName = trim($request->fName);
  $picturePath = trim($request->picturePath);
  $sEmail = trim($request->sEmail);
  $sGender = trim($request->gender);
  $status = trim($request->isActive);
  $school =  trim($request->school);


  $dob = trim($request->dob);
  $dob_date = date('Y-m-d H:i:s', strtotime($dob));
  
  // Update.
  $sql = "UPDATE `students` SET `fName`='$fName',`picturePath`='$picturePath' ,
                     `sEmail` = '$sEmail', `sGender` = '$sGender' ,
                     `sStatus` = '$status', `school` = '$school' , `sDOB` = '$dob_date'  WHERE `sId` = {$sId} LIMIT 1";
  error_log(DB_NAME . ": SQL UPDATE :" . $sql);
  $result = $dbConnect->query($sql);
  if($result) {
    sys_log("UPDATE-SUCCESS.");
    http_response_code(204);
  } else {
    sys_log("UPDATE-ERROR 422-01: " . $dbConnect->error );
    return http_response_code(422);
  }  
}
$dbConnect->close();
?>