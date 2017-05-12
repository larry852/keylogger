<?PHP
$archivo = 'data/autoLogin.json';
$abrir = fopen($archivo,'r+');
$contenido = fread($abrir,filesize($archivo));
echo json_encode($contenido);