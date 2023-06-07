import InputText from "@/components/elements/inputs/InputText";
import InputNumber from "@/components/elements/inputs/InputNumber";
import InputSearch from "@/components/elements/inputs/InputSearch";
import InputFile from "@/components/elements/inputs/InputFile";

const Input = Object.assign(
    {},
    {
        Text: InputText,
        Number: InputNumber,
        Search: InputSearch,
        File: InputFile
    }
)

export { Input }
