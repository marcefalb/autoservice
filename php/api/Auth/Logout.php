<?php

require '../../database/db.php';

$token = $_COOKIE['token'];

$authItem = R::find( 'authorization', ' token LIKE ? ', [ $token ]);

R::trash($token);