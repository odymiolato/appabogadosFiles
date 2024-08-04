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
                'message' => 'The file does not exist.'
            ]);
            return;
        }

        if (unlink($target_file)) {
            echo json_encode([
                'status' => 1,
                'message' => 'File deleted successfully.'
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Failed to delete the file.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No file specified'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
}
?>
