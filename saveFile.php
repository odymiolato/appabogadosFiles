<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $target_dir = "../abogadosfiles/exp01/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);

    if (file_exists($target_file)) {
        echo json_encode([
            'status' => 1,
            'message' => 'El archivo ya Existe.'
        ]);
        return;
    }

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode([
            'status' => 2,
            'message' => 'Archivo Subido.',
            'filename' => basename($_FILES["file"]["name"])
        ]);
    } else {
        echo json_encode([
            'status' => 3,
            'message' => 'Error al subir el archivo.',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
}
