const ManagementClient = require("auth0").ManagementClient;
const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

exports.handler = async function (event, context) {
  try {
    const params = JSON.parse(event.body);
    const roles = await auth0.assignRolestoUser(params);
    return {
      statusCode: 200,
      body: JSON.stringify(roles),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
