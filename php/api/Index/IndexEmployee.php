<?php

require '../../database/db.php';

$employee = R::getAll( 'SELECT * FROM employee' );

$response = array(
  'employee' => $employee,
);

echo json_encode($response);