export const clearNamedQueryParams = (
    query: string,
    names: readonly string[]
) => {
    const searchParams = new URLSearchParams(query);
    names.forEach((name) => {
        searchParams.delete(name);
    });
    return searchParams.toString();
};
