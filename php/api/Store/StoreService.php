<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$service = R::dispense( 'services' );

$service -> name = $_POST['name'];
$service -> price = $_POST['price'];
$service -> category_id = $_POST['category_id'];

$newService = R::store($service);

if ($newService) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}