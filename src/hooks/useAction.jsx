import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useKeyAction = ({ 
    action, 
    executeOnInit = true, 
    initialValue = null, 
    key,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [dbValue, setDbValue] = useLocalStorage(key, initialValue);
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