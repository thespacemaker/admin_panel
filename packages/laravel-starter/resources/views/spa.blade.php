<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/favicon.ico">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Lux Laravel Starter</title>

        <!-- Quicksand Font -->
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">

        <link href="{{ mix('dist/css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <noscript>
            <strong>We're sorry but this website doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="app"></div>
        <script src="{{ mix('dist/js/app.js') }}"></script>
    </body>
</html>
