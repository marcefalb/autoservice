<?php
require '../../database/db.php';

$_UPDATE = json_decode(file_get_contents('php://input'), true);

$employer = R::load( 'employee', $_UPDATE['id'] );

$employer -> name = $_UPDATE['name'];
$employer -> position = $_UPDATE['position'];
$employer -> rank = $_UPDATE['rank'];

$newEmployer = R::store($employer);

if ($newEmployer) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}

echo json_encode($response);