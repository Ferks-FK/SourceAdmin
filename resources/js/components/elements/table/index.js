import TableRow from "@/components/elements/table/Row";
import TableComponent from "@/components/elements/table/Table";
import Td from "@/components/elements/table/Td";
import Pagination from "@/components/elements/table/Pagination";
import Header from "@/components/elements/table/Header";

const Table = Object.assign(
    {},
    {
        Component: TableComponent,
        Row: TableRow,
        Td: Td,
        Pagination: Pagination,
        Header: Header
    }
)

export { Table }
