<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

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
$directory = 'test';

$baseUrl = 'http://192.168.1.189/' . $directory . '/';

$files = array_diff(scandir($directory), array('..', '.'));
$test = [];
foreach ($files as &$value) {
    $c = 0;
    $ext = (explode('.', $value)[1]);
    // while ($c < 100) {
    //     $test[] = new file((explode('.', $value)[0]), $ext, $baseUrl . $value, "img/" . $ext . ".png");
    //     $c += 1;
    // }
    $test[] = new file((explode('.', $value)[0]), $ext, $baseUrl . $value, "img/" . $ext . ".png");
}

echo json_encode($test);
