<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$employer = R::dispense( 'employee' );

$employer -> name = $_POST['name'];
$employer -> position = $_POST['position'];
$employer -> rank = $_POST['rank'];

$newEmployer = R::store($employer);

if ($newService) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}