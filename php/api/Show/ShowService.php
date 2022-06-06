<?php

require '../../database/db.php';

$id = $_GET['id'];

$service = R::load( 'services', $id );

$response = array(
  'service' => $service,
);

echo json_encode($response);