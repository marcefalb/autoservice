<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$service = R::dispense( 'services' );

$service -> title = $_POST['category']['title'];
$service -> price = $_POST['category']['price'];

$newPrice = R::store($service);

if ($newPrice) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}