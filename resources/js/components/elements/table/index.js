import TableRow from "@/components/elements/table/Row";
import TableComponent from "@/components/elements/table/Table";
import Td from "@/components/elements/table/Td";
import Pagination from "@/components/elements/table/Pagination";

const Table = Object.assign(
    {},
    {
        Component: TableComponent,
        Row: TableRow,
        Td: Td,
        Pagination: Pagination
    }
)

export { Table }
