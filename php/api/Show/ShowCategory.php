<?php

require '../../database/db.php';

$id = $_GET['id'];

$category = R::load( 'categories', $id );

$response = array(
  'category' => $category,
);

echo json_encode($response);