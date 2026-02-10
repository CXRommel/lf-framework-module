import { useMemo, useEffect, useRef } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useQuery = ({ collection, where }) => {
  const [table] = useLocalStorage(collection);

  console.log("useQuery", collection, table);
  const result = useMemo(() => {
    switch (where?.op) {
      case "==":
        return table?.filter((item) => item[where.field] === where.value);
      case "contains":
        return table?.filter((item) =>
          item[where.field].toLowerCase().includes(where.value.toLowerCase()),
        );
      default:
        return table || [];
    }
  }, [table, where]);

  return result;
};

export const Query = ({ collection, name, defaultValue, where, setData }) => {
  const result = useQuery({ collection, where });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, []);

  useDeepCompareEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, [result]);

  return <></>;
};

const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const useDeepCompareEffect = (effect, dependencies) => {
  const ref = useRef(dependencies);
  const prevDepsRef = useRef(dependencies);

  useEffect(() => {
    ref.current = dependencies;
  }, [dependencies]);

  useEffect(() => {
    if (!isEqual(ref.current, prevDepsRef.current)) {
      prevDepsRef.current = ref.current;
      return effect();
    }
  }, [dependencies]);
};
