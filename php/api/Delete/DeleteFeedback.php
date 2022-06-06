<?php

require '../../database/db.php';

$_DELETE = json_decode(file_get_contents('php://input'), true);

$feedback = R::load( 'feedbacks', $_DELETE['id'] );

$deletedFeedback = R::trash($feedback);

if ($deletedFeedback) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}