import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Search } from "@/components/elements/Search";
import { Input } from "@/components/elements/inputs";
import { Table } from "@/components/elements/table";
import { useEffect } from "react";

const Component = ({ columns, children, height, ...props }) => {
  const { setQuery, limitQuery, setLimitQuery } = props
  const { t } = useTranslation();

  // It will always fetch at least 1 line.
  useEffect(() => {
    limitQuery == 0 && setLimitQuery(1)
  }, [limitQuery])

  return (
    <div className={`overflow-x-auto whitespace-nowrap md:whitespace-normal w-full ${height ? `${height}` : ''}`}>
      <div className={`flex gap-2 justify-between mb-5 ${!limitQuery && !setQuery && 'hidden'}`}>
        {setLimitQuery && (
          <div className="w-14">
            <Input.Number
              placeholder={limitQuery}
              value={limitQuery}
              min={1}
              onChange={setLimitQuery}
            />
          </div>
        )}
        {setQuery && (
          <div className="w-full md:w-2/5 max-w-xs">
            <Search setQuery={setQuery}/>
          </div>
        )}
      </div>
      <table className="table-auto w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-300 uppercase bg-dark">
          <tr>
            {columns.map(( column ) => (
              <td key={lowerCase(column)} className="py-3 px-6">
                {t(lowerCase(column).replace(' ', ''), {ns: 'table'})}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.dataLength === 0 ?
            <Table.Row className={'!cursor-not-allowed'}>
              <Table.Td colSpan="7">
                <div className="text-center">
                  {t('no_data_found', {ns: 'table'})}
                </div>
              </Table.Td>
            </Table.Row>
          :
            children
          }
        </tbody>
      </table>
    </div>
  )
}

const TableComponent = Object.assign(Component, {})

export default TableComponent;
