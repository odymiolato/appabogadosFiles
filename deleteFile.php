<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['URL'])) {
        $target_url = $data['URL'];
        $target_file = str_replace("http://localhost", "..", $target_url);

        if (!file_exists($target_file)) {
            echo json_encode([
                'status' => 0,
                'message' => 'El archivo no existe.'
            ]);
            return;
        }

        if (unlink($target_file)) {
            echo json_encode([
                'status' => 1,
                'message' => 'Archivo eliminado.'
            ]);
        } else {
            echo json_encode([
                'status' => 2,
                'message' => 'Error al eliminar el archivo.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No se ha especificado ningún archivo.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Método de solicitud no válido.'
    ]);
}
?>
