<?php

require '../../database/db.php';

function generateRandomString($length = 10) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}
$imageName = generateRandomString(12) . '.png';

$category = R::dispense( 'categories' );
$content = file_get_contents($_FILES['image']['tmp_name']);

file_put_contents("../../../assets/images/services/{$imageName}", $content);
$category -> name = $_POST['name'];
$category -> description = $_POST['description'];
$category -> employer_id = $_POST['employer_id'];
if (isset($content)) $category -> img = $imageName;

$newCategory = R::store($category);

if ($newCategory) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}