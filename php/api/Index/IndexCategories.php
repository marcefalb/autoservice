<?php

require '../../database/db.php';

$categories = R::getAll( 'SELECT * FROM categories' );

$response = array(
  'categories' => $categories,
);

echo json_encode($response);