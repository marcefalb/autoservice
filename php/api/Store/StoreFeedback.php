<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$feedback = R::dispense( 'feedbacks' );

$feedback -> name = $_POST['name'];
$feedback -> phone = $_POST['phone'];
$feedback -> date = date('Y-m-d');

$newFeedback = R::store($feedback);

if ($newFeedback) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}

echo json_encode($response);