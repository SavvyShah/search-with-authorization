# Search with authorization

This app builds upon [Airbnb clone app](https://blog.reactivesearch.io/geo-search-with-react-and-elasticsearch). It shows listings of available stays where users can search and filter according to price, no. of guests, and date ranges. We are going to extend it, to include authentication and authorization.

Our extended app would have a login mechanism that would allow users to sign up/sign in. Each user would have a role assigned to them, either `guest` or `host`. As a `host` they would be able to create a listing but not as a `guest`. They would also be able to switch roles to test both types.

You can have a look at the [live app.](https://search-with-auth.netlify.app/)

## Running locally

This app is built and deployed using netlify. It uses netlify functions to perform server side operations.

For building the app locally we would use `netlify-cli`. We can install it using the below command.

```sh
npm i -g netlify-cli
```

We then need to install the app dependencies.

```sh
yarn
```

Then we need to make a `.env` file into the root directory. It should have following variables filled.

```env
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
APPBASE_API_CREDENTIAL=
```

We can then run

```sh
netlify dev
```
