<?php
//Obtenemos el json enviado - y se convierte en Array
$data_json = file_get_contents('php://input');

//Guardar datos
file_put_contents('data/autoLogin.json', print_r($data_json, true));
?>
