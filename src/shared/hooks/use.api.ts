import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

interface UseApiOptions<T> {
    immediate?: boolean;
    initialData?: T;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export function useApi<T, Args extends any[] = []>(
    apiFn: (...args: Args) => Promise<T>,
    options: UseApiOptions<T> & { initialData: T }
): { data: T; isLoading: boolean; error: Error | null; setData: Dispatch<SetStateAction<T>> };

export function useApi<T, Args extends any[] = []>(
    apiFn: (...args: Args) => Promise<T>,
    options?: UseApiOptions<T>
): { data: T | null; isLoading: boolean; error: Error | null; setData: Dispatch<SetStateAction<T | null>> };


export function useApi<T, Args extends any[] = []>(
    apiFn: (...args: Args) => Promise<T>,
    options: UseApiOptions<T> = {}
) {
    const { immediate = false, onSuccess, onError, initialData } = options;
    const [data, setData] = useState<T | null>(initialData ?? null);
    const [isLoading, setIsLoading] = useState(immediate);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(
        async (...args: Args) => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await apiFn(...args);
                setData(result);
                onSuccess?.(result);
                return result;
            } catch (err) {
                const errorObject = err instanceof Error ? err : new Error(String(err));
                setError(errorObject);
                onError?.(errorObject);
                throw errorObject;
            } finally {
                setIsLoading(false);
            }
        },
        [apiFn, onSuccess, onError]
    );

    useEffect(() => {
        if (immediate) {
            execute(...([] as unknown as Args));
        }
    }, [execute, immediate]);

    return { data, isLoading, error, setData };
}

