import { classNameWithDefault } from "~/util/classUtils";

const Select = (props: React.ComponentProps<"select">) => {
    return (
        <select
            {...props}
            className={classNameWithDefault(
                "select w-full max-w-xs select-bordered select-ghost focus:outline-none focus:border-primary"
            )}
        />
    );
};

export default Select;
