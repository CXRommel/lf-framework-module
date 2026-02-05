import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

// const ops = [
//     '==',
    // '!=',
    // '>',
    // '<',
    // '>=',
    // '<=',
    // 'contains',
    // 'notContains'
// ]

// const _where = {
//     field: 'id',
//     op: '==',
//     value: 1
// }

export const useQuery = ({ collection, where }) => {
    const [table] = useLocalStorage(collection);

    const result = useMemo(() => {
        switch (where.op) {
            case '==':
                return table?.filter((item) => item[where.field] === where.value);
            case 'contains':
                return table?.filter((item) => item[where.field].toLowerCase().includes(where.value.toLowerCase()));
            default:
                return table || [];
        }
    }, [table, where]);

    return result;

}

export const useCollectionAction = ({ 
    action, 
    executeOnInit = true, 
    initialValue = null, 
    collection,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [dbValue, setDbValue] = useLocalStorage(collection, initialValue);
    const [loading, execute, error] = useAction({
        action,
        executeOnInit,
        onSuccess: ({ data, payload }) => {
            setDbValue(data);
            onSuccess({ data, payload });
        },
        onError
    });
    
    return [dbValue, loading, execute, error];
}

export const useAction = ({
    action,
    executeOnInit = false,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (executeOnInit) {
            execute();
        }
    }, []);

    const execute = useCallback((...params) => {
        setLoading(true);
        action(...params)
            .then((data) => {
                setLoading(false);
                setError(null);
                onSuccess({ data, payload: params });
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                onError();
            });
    }, []);

    return [loading, execute, error] ;
}