import { classNameWithDefault } from "~/util/classUtils";

type TextInputProps = Omit<React.ComponentProps<"input">, "type">;

const TextInput = (props: TextInputProps) => {
    return (
        <input
            {...props}
            type="text"
            className={classNameWithDefault(
                "input input-bordered input-ghost focus:outline-none focus:border-primary",
                props.className
            )}
        />
    );
};

export default TextInput;
