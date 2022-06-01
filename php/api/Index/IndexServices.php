<?php

require '../../database/db.php';

$serviceId = $_GET['service'];

$services = R::getAll( "SELECT * FROM services WHERE category_id={$serviceId}" );
$category = R::load( 'categories', $serviceId );

$response = array(
  'services' => $services,
  'category' => $category,
);

echo json_encode($response);