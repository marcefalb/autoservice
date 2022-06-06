<?php

require '../../database/db.php';

$_DELETE = json_decode(file_get_contents('php://input'), true);

$order = R::load( 'orders', $_DELETE['id'] );

$deletedOrder = R::trash($order);

if ($deletedOrder) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}