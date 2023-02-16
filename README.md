# AesirX CRM

## About

AesirX CRM is our Open Source CRM as a service solution

Find out more in [https://crm.aesirx.io](https://crm.aesirx.io)

### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://crm.aesirx.io by creating an account.
1. Rename the `.env.dist` file to `.env`.
1. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_CLIENT_SECRET` replace this with the provided `REACT_APP_CLIENT_SECRET` from https://crm.aesirx.io/
   2. `REACT_APP_LICENSE` replace this with the provided `REACT_APP_LICENSE` from https://crm.aesirx.io/
   3. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://crm.aesirx.io/
   4. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://crm.aesirx.io/
   5. `REACT_APP_DAM_LICENSE` replace this with the provided `REACT_APP_DAM_LICENSE` from https://dam.aesirx.io/
   6. `REACT_APP_DMA_LICENSE` replace this with the provided `REACT_APP_DMA_LICENSE` from https://dma.aesirx.io/
1. Update `Domain` & `Test domain` for licenses. See the install guide for more information https://crm.aesirx.io/install-guide

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

#### Development

`docker compose -f "docker-compose.dev.yml" up -d --build`

#### Production

`docker compose -f "docker-compose.pro.yml" up -d --build`
