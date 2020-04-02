// This is a promise.all which resolves only 
// when *all* promises are completed (resolved/rejected).
// This is opposed to original promise.all
// which resolves if all promises are resolved or *one* is rejected.
// We need this for multiple async functions we want to run together
// regardless of one or another function fails in the proccess.
const allSettled = (promisesArr) => {
  const reflectedPromises = promisesArr.map(reflectPromise);

  return Promise.all(reflectedPromises);
}

// This help us make promise never actually reject so promise.all wont end.
const reflectPromise = (promise) => {
  // Notice this wont actually resolves promise,
  // but just modifies the handlers which be will be called on resolve.
  return promise.then(reflectResult, reflectError);
}

const reflectError = (error) => ({ payload: error, resolved: false });
const reflectResult = (result) => ({ payload: result, resolved: true });

export const promisesService = {
  allSettled
}