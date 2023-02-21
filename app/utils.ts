import { useMatches, useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
    to: FormDataEntryValue | string | null | undefined,
    defaultRedirect: string = DEFAULT_REDIRECT
) {
    if (!to || typeof to !== "string") {
        return defaultRedirect;
    }

    if (!to.startsWith("/") || to.startsWith("//")) {
        return defaultRedirect;
    }

    return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
    id: string
): Record<string, unknown> | undefined {
    const matchingRoutes = useMatches();
    const route = useMemo(
        () => matchingRoutes.find((route) => route.id === id),
        [matchingRoutes, id]
    );
    return route?.data;
}

export const useSearchParamValues = <TKey extends string>(
    keys: readonly TKey[]
): Record<TKey, string | undefined> => {
    const [params] = useSearchParams();

    return keys
        .map((key) => [key, params.get(key) || undefined])
        .reduce(
            (acc, [k, v]) => ({ ...acc, k: v }),
            {} as Record<TKey, string | undefined>
        );
};
