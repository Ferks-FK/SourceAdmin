import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";

const Component = ({ columns, children, height }) => {
  const { t } = useTranslation()

  return (
    <div className={`overflow-x-auto whitespace-nowrap md:whitespace-normal ${height ? `${height}` : ''}`}>
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
          {children}
        </tbody>
      </table>
    </div>
  )
}

const TableComponent = Object.assign(Component, {})

export default TableComponent;
