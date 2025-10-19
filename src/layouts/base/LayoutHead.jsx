import { useState } from 'react';
export default function LayoutHead({title = "Belekok Astro", description = "Frontend SSR project powered by Astro and React."}) {
    return (
        <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>{title}</title>

    <meta name={description} content="" />

    <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&ampdisplay=swap"
      rel="stylesheet" />

    <link rel="stylesheet" href="../../assets/vendor/fonts/iconify-icons.css" />


    <link rel="stylesheet" href="../../assets/vendor/libs/node-waves/node-waves.css" />

    <script src="../../assets/vendor/libs/@algolia/autocomplete-js.js"></script>

    <link rel="stylesheet" href="../../assets/vendor/libs/pickr/pickr-themes.css" />

    <link rel="stylesheet" href="../../assets/vendor/css/core.css" />
    <link rel="stylesheet" href="../../assets/css/demo.css" />


    <link rel="stylesheet" href="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

    <script src="../../assets/vendor/js/helpers.js"></script>

    <script src="../../assets/vendor/js/template-customizer.js"></script>


    <script src="../../assets/js/config.js"></script>
  </head>
    );
};