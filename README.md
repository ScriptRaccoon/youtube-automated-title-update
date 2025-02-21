# Automatic YouTube Video Title Update

This project automatically updates the title of a specified YouTube video by including the current number of views and likes. The process involves:

-   Running a script every 10 minutes via a GitHub Action
-   Accessing the YouTube Data API to edit the video title

Below you find detailed instructions how to apply this process to your YouTube video.

## Setup of the repository

1. Clone this repository.
2. Make sure that [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/) are installed.
3. Install the dependencies with `pnpm install`.
4. Change the implementation of the function `getNewTitle` in `update-video.ts` to your needs.

## Setup on Google Cloud

1. Login to your Google account.
2. Open the Google Cloud console at <https://console.cloud.google.com/>
3. Create a new project: <https://console.cloud.google.com/projectcreate>
4. Switch to the project.
5. Open the API library: <https://console.cloud.google.com/apis/library>
6. Search for "YouTube Data API v3" and click on it.
7. Click "Enable" to enable the API for your project.
8. Click "Create credentials".
9. In the prompt which type of data is used, select "User data".
10. Fill in the details for the consent screen (app name, support mail, developer mail).
11. In the scopes section, click "Add or Remove scopes".
12. In the modal, search for "youtube". Select the scope `.../auth/youtube`.
13. Click "Update" to confirm the scopes. Click "Save and Continue".
14. In the application type, select "Web application".
15. Choose a name for the application or keep the default name.
16. In the "Authorized redirect URIs", add `http://localhost:3000/callback`.
17. Download the credentials as a JSON file.
18. In the "Audience" tab of the application, add your Google account to the "Test users".

## Specify the environment variables

1. In the repository, create a copy `.env` of the file `.env.example`.
2. Open the JSON file and copy the values of `client_id` and `client_secret` from the downloaded JSON file to the `.env` file.
3. In the `.env` file, add `http://localhost:3000/callback` as the redirect uri.
4. Specify the video ID in the `.env` file. This is the video that will be updated.

## Retrieve the refresh token

1. Inside the repository, run the script `pnpm auth`.
2. Open `http://localhost:3000` and follow the link.
3. Login with the account that manages your YouTube account. In case you have a brand account, you need to choose the brand account.
4. After login, you will be redirected to `http://localhost:3000/callback` and see a refresh token and access token. In case you already generated a refresh token which has not expired, it will not be included in the response.
5. Copy the refresh token to the `.env` file. The file should now be complete.

Repeat this step in case your refresh token has expired.

## Test the update script locally

1. Run `pnpm update:video`.
2. Verify that the video title has been updated.

## Deploy the Cron Job via Github Actions

1. Change the cron schedule in the workflow file `update.yml` if necessary. You may use [crontab.guru](https://crontab.guru/) for the syntax. This determines how often the update script wil run.
2. Push your code to a GitHub repository.
3. In the settings of the repository, open the Settings > Security > Secrets and variables > Actions.
4. For every environment variable in your local `.env` file, add a corresponding secret for GitHub Actions.
5. Manually trigger the "YouTube Video Update Cron Job" action to verify that it is running.
6. Wait for the scheduled run of the action. It may take a while.
