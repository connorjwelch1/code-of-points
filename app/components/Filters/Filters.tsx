import { Form, useLocation, useNavigate } from "@remix-run/react";
import { useSearchParamValues } from "~/utils";
import Button from "../Button/Button";
import Label from "../Label";
import Select from "../Select";
import TextInput from "../TextInput";
import { useEvent } from "~/util/routeLoaderData";
import { useRef } from "react";
import { clearNamedQueryParams } from "~/util/urlUtils";

const formFields = ["searchTerm", "minValue", "elementGroup"] as const;

const Filters = () => {
    const {
        event: { elementGroups },
    } = useEvent();
    const navigate = useNavigate();
    const location = useLocation();
    const formRef = useRef<HTMLFormElement>(null);
    const { searchTerm, minValue, elementGroup } =
        useSearchParamValues(formFields);

    return (
        <div className="flex justify-center">
            <Form className="flex flex-col gap-2 w-min" ref={formRef}>
                <Label htmlFor="searchTerm">Search term</Label>
                <TextInput name="searchTerm" defaultValue={searchTerm} />
                <Label htmlFor="minValue">Minimum value</Label>
                <Select name="minValue" defaultValue={minValue}>
                    <option disabled selected>
                        Select a value
                    </option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                        (val) => (
                            <option key={val}>{val}</option>
                        )
                    )}
                </Select>
                <Label htmlFor="elementGroup">Element group</Label>
                <Select name="elementGroup" defaultValue={elementGroup}>
                    <option disabled selected>
                        Select an element group
                    </option>
                    {elementGroups.map((elementGroup) => (
                        <option key={elementGroup.groupNumber}>
                            {elementGroup.groupNumber}
                        </option>
                    ))}
                </Select>
                <Button type="submit">Search Skills</Button>
                <Button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                        navigate({
                            ...location,
                            search: clearNamedQueryParams(
                                location.search,
                                formFields
                            ),
                        });
                        formRef.current?.reset();
                    }}
                >
                    Clear
                </Button>
            </Form>
        </div>
    );
};

export default Filters;
