<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$students = [];
$sql = "SELECT sId, fName, sGender, sEmail, sStatus,school, picturePath, sDOB FROM students";
$result = $dbConnect->query($sql);
if($result->num_rows > 0)
{
  $i = 0;
  while($row = $result->fetch_assoc())
  {
    $students[$i]['sId']    = $row['sId'];
    $students[$i]['fName'] = $row['fName'];
    $students[$i]['gender'] = $row['sGender'];
    $students[$i]['sEmail'] = $row['sEmail'];
    $students[$i]['isActive'] = $row['sStatus'];
    $students[$i]['school'] = $row['school'];
    $students[$i]['picturePath'] = $row['picturePath'];
    $students[$i]['dob'] = $row['sDOB'];
    $i++;
  }

    echo json_encode($students);
} else {
  http_response_code(404);
}
 $dbConnect->close();
?>