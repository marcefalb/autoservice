<?php

require '../../database/db.php';

$_DELETE = json_decode(file_get_contents('php://input'), true);

$service = R::load( 'services', $_DELETE['id'] );

$deletedService = R::trash($service);

if ($deletedService) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}