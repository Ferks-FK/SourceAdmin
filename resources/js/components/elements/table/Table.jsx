import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Table } from "@/components/elements/table";

const Component = ({ columns, children, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`flex flex-col gap-4 overflow-x-auto whitespace-nowrap md:whitespace-normal ${className ?? ''}`}>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-300 uppercase bg-dark-primary">
            <tr>
              {columns.map((column) => (
                <td key={lowerCase(column)} className="py-3 px-6">
                  {t(lowerCase(column).replace(' ', ''), { ns: 'table' })}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.dataLength === 0 ?
              <Table.Row className={'!cursor-not-allowed'}>
                <Table.Td colSpan="7">
                  <div className="text-center">
                    {t('no_data_found', { ns: 'table' })}
                  </div>
                </Table.Td>
              </Table.Row>
              :
              children
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

const TableComponent = Object.assign(Component, {})

export default TableComponent;