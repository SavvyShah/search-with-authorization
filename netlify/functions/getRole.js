const ManagementClient = require("auth0").ManagementClient;

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

exports.handler = async function (event, context) {
  try {
    const { user_id } = event.queryStringParameters;
    const roles = await auth0.getUserRoles({ id: user_id });
    return {
      statusCode: 200,
      body: JSON.stringify(roles[0]),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
