export const classNameWithDefault = (
    defaultClassName: string,
    className?: string
) => {
    return className ? `${defaultClassName} ${className}` : defaultClassName;
};
