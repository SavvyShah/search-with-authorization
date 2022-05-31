const ManagementClient = require("auth0").ManagementClient;
const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

exports.handler = async function (event, context) {
  try {
    const params = JSON.parse(event.body);
    const allRoles = await auth0.getRoles();
    await auth0.removeRolesFromUser(
      { id: params.user_id },
      { roles: allRoles.map((role) => role.id) }
    );
    const matchedRoles = allRoles.filter((role) => role.name === params.role);
    const roles = await auth0.assignRolestoUser(
      {
        id: params.user_id,
      },
      { roles: matchedRoles.map((role) => role.id) }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(roles),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Please select a valid role. This may happen if you haven't selected any role.",
      }),
    };
  }
};
