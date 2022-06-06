<?php

require '../../database/db.php';

$feedbacks = R::getAll( 'SELECT * FROM feedbacks' );

$response = array(
  'feedbacks' => $feedbacks,
);

echo json_encode($response);