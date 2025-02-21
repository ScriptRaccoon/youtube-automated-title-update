# Automatic YouTube Video Title Update

This project automatically updates the title of a specified YouTube video by including the current number of views and likes. The process involves:

-   Running a script every 10 minutes via a GitHub Action
-   Accessing the YouTube Data API to edit the video title

## Development

To get started, ensure you have Node.js and pnpm installed. Then, install the dependencies with:

-   `pnpm update:video` - Updates the video title once
-   `pnpm auth` - Generates an access and refresh token for OAuth2

You need to set the following environment variables:

```
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=
REFRESH_TOKEN=
VIDEO_ID=
```

The `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI` should be configured in a Google Cloud Platform (GCP) project. More details on this process will be added later.

When deploying a fork of this project, ensure these environment variables are also added to the GitHub Actions secrets.
