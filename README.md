# Application with login form & localization

## Deploy link:
https://pet-spa-auth-localization.vercel.app/

## Used Stack:
- React
- Typescript
- Redux Toolkit
- Material UI v5
- react-i18next
- react-router-dom v6
- sass

## Application description:
- header with 2 public tabs (/home, /news) and 1 tab (/profile), which available for only authenticated users
- header has switch language (en, uk) buttons and login/logout button
- news page has got news which from fake api jsonplaceholder
- each news can be deleted throw modal window
- after clicking login button user is redirected to the authorization page
- authorisation page has name validation (only latins & less than 10 symbols)
- application has localization to English & Ukrainian