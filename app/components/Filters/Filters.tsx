import { Form } from "@remix-run/react";
import { useSearchParamValues } from "~/utils";

const Filters = () => {
    const { searchTerm, minValue } = useSearchParamValues([
        "searchTerm",
        "minValue",
    ]);

    return (
        <div className="flex justify-center">
            <Form className="flex flex-col gap-2 w-min">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search term"
                    className="input input-bordered input-primary"
                    defaultValue={searchTerm}
                />
                <select
                    className="select w-full max-w-xs select-bordered"
                    name="minValue"
                    defaultValue={minValue}
                >
                    <option disabled selected>
                        Mininum Value
                    </option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                        (val) => (
                            <option key={val}>{val}</option>
                        )
                    )}
                </select>
                <button type="submit" className="btn btn-primary">
                    Search Skills
                </button>
            </Form>
        </div>
    );
};

export default Filters;
