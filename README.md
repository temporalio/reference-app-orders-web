# OMS Web Application

This repository contains a web application that enables one to interact with the Order 
Management System (OMS) reference application. Code for the OMS is maintained in the 
[reference-app-orders-go](https://github.com/temporalio/reference-app-orders-go)
repository. Since this web application depends on services provided by the OMS, you will 
need code from both repositories to run it. 

The steps below minimally cover how to run and build the web application. See the 
[other repository](https://github.com/temporalio/reference-app-orders-go) 
for detailed instructions on running and using the Order Management System. 


## Running the Web Application Locally

After you start the API servers and one or more Workers, as [described in the 
OMS instructions](https://github.com/temporalio/reference-app-orders-go?tab=readme-ov-file#quickstart), 
run the following [`pnpm`](https://pnpm.io/) commands from the root directory of this project:

```bash
pnpm i
pnpm dev
```

This starts a local server. You can navigate to http://127.0.0.1:5173/ to view the web application. 

NOTE: As a workaround for deployment to [GitPod](https://gitpod.io/), in which the domain of each application 
container is assigned dynamically, this application [disables the CSRF origin check](https://github.com/temporalio/reference-app-orders-web/blob/5a1044ddae5a5f110263b9c464f576384d533036/svelte.config.js#L10-L12). [Pull request #6](https://github.com/temporalio/reference-app-orders-web/pull/6) describes this in more detail, and we recommend reinstating this origin check for improved security in a 
real-world deployment. 


## Building the Web Application

Run `pnpm build` to create a production version of your app. You can then preview the production build by
running `pnpm preview`.

The [`.github/workflows/docker-publish.yml`](https://github.com/temporalio/reference-app-orders-web/blob/main/.github/workflows/docker-publish.yml) 
file automates the creation and publication of Docker images in response to code changes. 
