const db = {
  collection: (collectionName) => {
    return {
      createOrUpdate: (data) => {
        const collection =
          JSON.parse(localStorage.getItem(collectionName)) || [];
        const item = collection.find((item) => item.id === data.id);
        if (item) {
          collection.splice(collection.indexOf(item), 1);
        }
        collection.push(data);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
      bulkWrite: (data) => {
        localStorage.setItem(collectionName, JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      },
      insertOne: (data) => {
        const collection =
          JSON.parse(localStorage.getItem(collectionName)) || [];
        collection.push(data);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
      bulkCreateOrUpdate: (data) => {
        const collection =
          JSON.parse(localStorage.getItem(collectionName)) || [];
        data.forEach((item) => {
          const _item = collection.find((i) => i.id === item.id);
          if (_item) {
            collection.splice(collection.indexOf(_item), 1);
          }
          collection.push(item);
        });
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
    };
  },
};

function createAction(client, action, service) {
  return (...params) => {
    window.dispatchEvent(
      new CustomEvent(`lf:${action}:start`, { detail: { action } }),
    );
    return client[action](...params)
      .then((result) => {
        service.onSuccess({ action, payload: result, params, db });
        window.dispatchEvent(
          new CustomEvent(`lf:${action}:success`, { detail: { action } }),
        );
      })
      .catch((error) => {
        service.onError({ action, error, params, db });
        window.dispatchEvent(
          new CustomEvent(`lf:${action}:error`, { detail: { action } }),
        );
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
