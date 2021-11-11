/**
 * Wrap meteor call to be maintainable
 * @param method
 * @param parameters
 * @return {Promise<*>}
 */
const meteorCall = (method, ...parameters) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, ...parameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }).then(res => res).catch(err => {
    throw new Meteor.Error(err.error, err.message, err.reason)
  });
}

export {
  meteorCall
}