# LAM LE — Static Interactive Portfolio

This version uses only HTML, Bootstrap CSS, custom CSS, and vanilla JavaScript.
It does not require Node.js, a database, an API, or a web server.

## Open the portfolio

1. Extract the archive.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari.

Bootstrap is loaded from its official CDN. The main visual design is also
defined in `assets/css/styles.css`, so the portfolio remains readable if the
CDN is unavailable.

## Main files

- `index.html` — all portfolio content and accessible page structure
- `assets/css/styles.css` — responsive design and photo transitions
- `assets/js/main.js` — experience tabs, keyboard navigation, image changes,
  progress indicator, subtle pointer movement, and scroll reveals
- `assets/images/` — four experience photographs

## Experience interaction

The experience section contains four steps. Visitors can:

- click or hover over a step;
- move through steps with the arrow, Home, and End keys;
- see the related photograph, caption, counter, and progress update;
- use the experience on touch screens and smaller displays.

## Customize

Edit the role descriptions in `index.html`. To replace a representative image
with a real project or workplace photo, keep the same filename or update its
`src` value in `index.html`.

The supplied résumé did not include verified company names, dates, university,
LinkedIn, GitHub, project URLs, or certifications. Add those facts before using
the portfolio for job applications.
