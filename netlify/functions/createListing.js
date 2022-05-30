const Appbase = require("appbase-js");

exports.handler = async function (event, context) {
  try {
    const appbaseRef = Appbase({
      url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
      app: "clone-airbeds",
      credentials: process.env.APPBASE_API_CREDENTIAL,
    });
    const doc = await appbaseRef.index({
      body: {
        name: "Test airbeds",
        host_name: "Mimi",
        accomodates: 2,
        bedrooms: 1,
        date_from: new Date("2017-04-13"),
        date_to: new Date("2017-05-14"),
        price: 150,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(doc),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      error: e,
    };
  }
};
