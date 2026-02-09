import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useAction } from "./useAction";

export const useCollectionAction = ({
  action,
  executeOnInit = true,
  initialValue = null,
  collection,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [dbValue, setDbValue] = useLocalStorage(collection, initialValue);
  const [loading, execute, error] = useAction({
    action,
    executeOnInit,
    onSuccess: ({ data, payload }) => {
      setDbValue(data);
      onSuccess({ data, payload });
    },
  });

  return [dbValue, loading, execute, error];
};

export const CollectionAction = ({
  actionName,
  collection,
  action,
  initialValue,
  setServices,
}) => {
  const [dbValue, loading, execute, error] = useCollectionAction({
    action: action,
    executeOnInit: true,
    initialValue: initialValue,
    collection: collection,
    onSuccess: ({ data, payload }) => {
      // onSuccess({ data, payload });
    },
    onError: () => {
      // onError();
    },
  });

  useEffect(() => {
    if (!actionName) return;
    setServices((prev) => {
      console.log("actionName", actionName);
      const _serviceName = actionName.split(".")[0];
      const _actionName = actionName.split(".")[1];

      return {
        ...prev,
        [_serviceName]: {
          [_actionName]: execute,
        },
      };
    });
  }, [actionName]);

  return <></>;
};
