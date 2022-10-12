/**
 * The method that will use the 'call' method of client to fetch the data from Moodle
 * @param {string} coreFunction Name of the function/REST service that needs to be called
 * @param {Object} args An object containing the body arguments for the service
 * @param {Object} client An object of moodle-client instance
 * @returns {Object} result from the call
 */
async function requestGenerator(coreFunction, args, client) {
  try {
    const data = await client.call({
      wsfunction: coreFunction,
      method: "POST",
      args,
    });

    return data;
  } catch (error) {
    console.log("failed to execute the core function: ", error);
  }
}

module.exports = requestGenerator;
