import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

// unsure how to fix this issue...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFN = (...args: any) => any;

export function useThunk<T extends AnyFN>(thunk: T) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const dispatch = useDispatch();

    const runThunk = useCallback(
        (...args: Parameters<typeof thunk>) => {
            setIsLoading(true);
            dispatch(thunk(...[...args]))
                .unwrap()
                .catch((err: unknown) => setError(err as unknown as Error))
                .finally(() => setIsLoading(false));
        },
        [dispatch, thunk]
    );

    return [runThunk, isLoading, error] as [
        typeof runThunk,
        boolean,
        Error | null,
    ];
}
