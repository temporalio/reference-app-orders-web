# OMS Web Interface

This repository contains the web application corresponding to the Order Management System reference 
application, code for which is found in the [reference-app-orders-go](https://github.com/temporalio/reference-app-orders-go)
repository. To run this application, you will need code from both repositories. 

## Running locally

```bash
pnpm i
pnpm dev
```

Navigate to http://127.0.0.1:5173/ to view UI.

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.
