# Usage
`$ npm run dev`
  Will start a development version, browsersync watching for changes and reloading the page,
`$ npm run start`
  Builds, and starts the node server, which also serves the code in `public`.

The code is split on to parts, `client` where the webapp is, and `server`
which contains the api and also serves the compiled code.

# Client

  Based on the angular2-quickstart seed at https://github.com/angular/quickstart

  These are the main bullet points showcased in this code:
    - NgModules (imports/declarations/providers)
    - Components (like the old directives, declaring a template, a styles, and a logic)
    - angular2 lifecycle hooks (OnInit, OnDestroy...)
    - Services with Dependency Injection, as parameters to the constructor function of the consumers.
    - Providers that inject services.
    - Typescript data types validation.
    - Simple interaction with an HTTP Backend
    - Simple routing through a webpage, default route, route with parameters, with async fetch of data
    - Simple subscribe/observer pattern on data, using rxjs operators

# Server

  Very simple node ES6 script, with Express JS, two API routes, static routes
  for the webapp, and a catch-all router that fallbacks to index.html


# Process (Gulp)

  Even though I could get away with using just npm scripts to
compile TS, i felt it was cleaner to create a simple gulp script that leaves
the `src` directory clean (only source), and outputs everything to a `public`
folder which can then be distributed as an artifact.

# Todo

I'm not really an expert on angular2/4 yet, it's pretty new to me, but it's
clear the next improvements I would try to work out would be:

- figure out bundling for production, and enableProdMode
- inject some environment variables (production, apiUrl, etc)
- improve style structure with SASS
- Work on the interface: colors, shapes, buttons/positions, effects ...
