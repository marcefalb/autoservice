<?php
require '../../database/db.php';

$_UPDATE = json_decode(file_get_contents('php://input'), true);

$service = R::load( 'services', $_UPDATE['id'] );

$service -> name = $_UPDATE['name'];
$service -> price = $_UPDATE['price'];
$service -> category_id = $_UPDATE['category_id'];

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

echo json_encode($response);