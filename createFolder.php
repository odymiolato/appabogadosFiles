<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['USERID'])) {
    echo json_encode([
        'status' => 3,
        'message' => 'Sin id de usuario.'
    ]);
    exit;
}

$folderName = preg_replace('/[^a-zA-Z0-9_-]/', '', $data['USERID']);
$types_documents = $data['TYPE_DOCUMENTS'];

$directoryPath = '../abogadosfiles/exp' . $folderName;

if (file_exists($directoryPath)) {
    echo json_encode([
        'status' => 3,
        'message' => 'La carpeta ya existe.'
    ]);
    exit;
}

if (mkdir($directoryPath, 0777, true)) {
    foreach ($types_documents as $value) {
        if (!mkdir($directoryPath . '/' . $value['name'], 0777, true)) {
            echo json_encode([
                'status' => 3,
                'message' => 'Error al crear una de las carpetas.'
            ]);
            exit;
        }
    }
    echo json_encode([
        'status' => 2,
        'message' => 'Carpeta creada correctamente.'
    ]);
} else {
    echo json_encode([
        'status' => 3,
        'message' => 'Error al crear carpeta.'
    ]);
}
