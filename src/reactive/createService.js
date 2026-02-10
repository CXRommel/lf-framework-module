const db = {
  collection: (collectionName) => {
    return {
      bulkWrite: (data) => {
        localStorage.setItem(collectionName, JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      },
      insertOne: (data) => {
        console.log("data", data);
        const collection =
          JSON.parse(localStorage.getItem(collectionName)) || [];
        collection.push(data);
        console.log(collection);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
    };
  },
};

function createAction(client, action, service) {
  return (...params) => {
    return client[action](...params).then((result) => {
      service.onSuccess({ action, payload: result, params, db });
    });
  };
}

export function createService(client, service) {
  let result = {};

  Object.keys(client).forEach((key) => {
    result[key] = createAction(client, key, service);
  });

  return result;
}
