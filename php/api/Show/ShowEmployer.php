<?php

require '../../database/db.php';

$id = $_GET['id'];

$employer = R::load( 'employee', $id );

$response = array(
  'employer' => $employer,
);

echo json_encode($response);