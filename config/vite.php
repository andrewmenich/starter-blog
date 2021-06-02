<?php

use craft\helpers\App;

return [
  'useDevServer' => App::env('ENVIRONMENT') === 'dev',
  'manifestPath' => 'http://localhost:3000/dist/manifest.json',
  'devServerPublic' => 'http://starter-blog.test:3000/',
  'serverPublic' => App::env('PRIMARY_SITE_URL') . '/assets/dist/',
  'errorEntry' => '',
  'cacheKeySuffix' => '',
  'devServerInternal' => 'http://localhost:3000/',
  'checkDevServer' => true,
];
