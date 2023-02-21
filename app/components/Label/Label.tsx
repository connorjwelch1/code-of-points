import { classNameWithDefault } from "~/util/classUtils";

const Label = (props: React.ComponentProps<"label">) => {
    const { children, ...rest } = props;
    return (
        <label
            {...rest}
            className={classNameWithDefault("label", props.className)}
        >
            <span className="label-text">{children}</span>
        </label>
    );
};

export default Label;
