<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$feedback = R::dispense( 'feedback' );

$feedback -> name = $_POST['feedback']['name'];
$feedback -> phone = $_POST['feedback']['phone'];

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