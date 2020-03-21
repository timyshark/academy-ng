<?php
require 'database.php';

// Get the posted data. from request body using POST
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if($request->sId == null ) {
    return http_response_code(400);
  }
  $student = new Student();

  // Sanitize.
  $student->fName = trim($request->fName);
  $student->picturePath = trim($request->picturePath);
  $student->sEmail = trim($request->sEmail);
  $student->sGender = trim($request->gender);
  $student->status = trim($request->isActive);
  $student->school =  trim($request->school);
  $student->dob = date('Y-m-d H:i:s', strtotime(trim($request->dob)));

  // Create.
  $sql = "INSERT INTO `students`(`sId`,`fName`,`sDOB`, `picturePath`, `sEmail`,`sGender`,`sStatus`,`school`) " .
                   " VALUES (null,'{$student->fName}','{$student->dob}', '{$student->picturePath}','{$student->sEmail}',  " .
                   " '{$student->sGender}','{$student->status}','{$student->school}')";
  
  sys_log("SQL INSERT :" . $sql);
  if($dbConnect->query($sql)) {
    http_response_code(201);        
    $student->sId = $dbConnect->insert_id;
    sys_log("INSERT-SUCCESS. New sId:" . $student->sId);
    echo json_encode($student);
  }  else  {
    sys_log( "INSERT-ERROR 422-02: " . $dbConnect->error );
    http_response_code(422);
  }
}
$dbConnect->close();
?>