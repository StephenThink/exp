<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('identify-duplicates', function () {
    $duplicates = [];
    $shouldFixDuplicates = $this->confirm('Should Duplicate IDs be replaced with fresh IDs?');

    $items = collect(\Illuminate\Support\Facades\File::allFiles(__DIR__ . '/../content'))
        ->filter(function ($file) {
            return $file->isFile();
        })
        ->map(function (SplFileInfo $file) {
            $data = \Statamic\Facades\YAML::parse(file_get_contents($file->getRealPath()));

            return [
                'path' => $file->getRealPath(),
                'stache_id' => isset($data['id']) ? $data['id'] : null,
            ];
        })
        ->reject(function ($item) {
            return is_null($item['stache_id']);
        });

    $items->each(function ($item) use (&$duplicates, $items) {
        $itemsWithCurrentId = $items->where('stache_id', $item['stache_id']);

        if ($itemsWithCurrentId->count() > 1) {
            if (array_key_exists($item['stache_id'], $duplicates)) {
                $duplicates[$item['stache_id']] = array_merge($duplicates[$item['stache_id']], [
                    $item['path'],
                ]);
            } else {
                $duplicates[$item['stache_id']] = [
                    $item['path'],
                ];
            }
        }
    });

    foreach ($duplicates as $id => $items) {
        $this->error("Duplicate ID Found: {$id}");

        foreach ($items as $item) {
            $this->line($item);

            if ($shouldFixDuplicates) {
                $contents = file_get_contents($item);
                $contents = str_replace($id, \Statamic\Facades\Stache::generateId(), $contents);
                file_put_contents($item, $contents);
            }
        }

        $this->line('');
    }

    if ($shouldFixDuplicates) {
        Artisan::call('cache:clear');
        $this->info('Duplicate IDs have been replaced and your Cache has been cleared. Have a good day!');
    }
});
