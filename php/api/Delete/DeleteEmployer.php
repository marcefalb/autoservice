<?php

require '../../database/db.php';

$_DELETE = json_decode(file_get_contents('php://input'), true);

$employer = R::load( 'employee', $_DELETE['id'] );

$deletedEmployer = R::trash($employer);

if ($deletedEmployer) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}