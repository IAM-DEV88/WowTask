<?php
$encoded_data = json_encode($_POST['datos'], JSON_PRETTY_PRINT);
$archivo = "personaje.json";

if(file_put_contents($archivo, $encoded_data)){
	print_r("Archivo actualizado");
}
else{
	print_r("Error al actualizar");
}
?>