const Appbase = require("appbase-js");
const ManagementClient = require("auth0").ManagementClient;

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

exports.handler = async function (event, context) {
  try {
    const { user_id, ...body } = JSON.parse(event.body);
    const roles = await auth0.getUserRoles({ id: user_id });
    const isHost = roles.filter((role) => role.name === "host").length > 0;
    if (isHost) {
      const appbaseRef = Appbase({
        url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
        app: "clone-airbeds",
        credentials: process.env.APPBASE_API_CREDENTIAL,
      });
      const doc = await appbaseRef.index({
        body,
      });
      return {
        statusCode: 200,
        body: JSON.stringify(doc),
      };
    } else {
      throw new Error("Unauthorized: User doesn't have necessary permission");
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
