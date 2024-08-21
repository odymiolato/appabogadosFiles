<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

class file
{
    public $filename;
    public $extension;
    public $path;
    public $image;

    public function __construct($filename, $extension, $path, $image)
    {
        $this->filename = $filename;
        $this->extension = $extension;
        $this->path = $path;
        $this->image = $image;
    }
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo  json_encode(['message' => 'incorrect method']);
    return;
}

$data = json_decode(file_get_contents('php://input'));

if (!isset($data) && empty($data)) {
    return;
}

$directory = $data->URL;

$baseUrl = 'http://localhost' . $directory . '/';
$files = array_diff(scandir(".." . $directory), array('..', '.'));
$test = [];
foreach ($files as &$value) {
    $c = 0;
    $ext = (explode('.', $value)[1]);
    $image = "" .  (($ext == 'jpg' || $ext == 'png' || $ext == 'gif' || $ext == 'svg') ? 'image' : $ext);
    // while ($c < 100) {
    //     $test[] = new file((explode('.', $value)[0]), $ext, $baseUrl . $value, $image);
    //     $c += 1;
    // }
    $test[] = new file((explode('.', $value)[0]), $ext, $baseUrl . $value, $image);
}

echo json_encode($test);
