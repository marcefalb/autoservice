<?php

require '../../database/db.php';

$categories = R::getAll( 
  '
  SELECT categories.id AS id, categories.name AS name, categories.img as img, employee.name as employerName, (SELECT count(*) FROM services WHERE services.category_id = categories.id) AS services_count
  FROM categories, employee
  WHERE employee.id = categories.employer_id
  ' 
);

$response = array(
  'categories' => $categories,
);

echo json_encode($response);