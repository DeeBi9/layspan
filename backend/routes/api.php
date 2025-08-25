<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

Route::post('/upload', function (Request $request) {
    $files = $request->file('files') ?: $request->file('files[]');

    if (!$files) {
        return response()->json(['error' => 'No files uploaded'], 400);
    }

    if (!is_array($files)) {
        $files = [$files];
    }

    $client = new Client();
    $multipart = [];

    foreach ($files as $file) {
        $multipart[] = [
            'name'     => 'files',
            'contents' => $file->get(),
            'filename' => $file->getClientOriginalName(),
        ];
    }

    try {
        $res = $client->post('http://127.0.0.1:8001/process', [
            'multipart' => $multipart
        ]);
        return response()->json(json_decode($res->getBody(), true));
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to process files: ' . $e->getMessage()], 500);
    }
});