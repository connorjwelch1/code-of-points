import { classNameWithDefault } from "~/util/classUtils";

const Button = (props: React.ComponentProps<"button">) => {
    return (
        <button
            {...props}
            className={classNameWithDefault(
                "btn btn-primary normal-case",
                props.className
            )}
        >
            {props.children}
        </button>
    );
};

export default Button;
