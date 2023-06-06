import { useEffect, useState } from "react";
import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Search } from "@/components/elements/Search";
import { Input } from "@/components/elements/inputs";
import { Select } from "@/components/elements/Select";
import { Table } from "@/components/elements/table";

const Component = ({ columns, children, className, ...props }) => {
  const {
    setQuery,
    page,
    setPage,
    paginationData
  } = props
  const { t } = useTranslation();

  return (
    <>
      {setQuery ?
        <div className={"flex gap-2 justify-end w-full"}>
          <div className="w-full md:w-2/5 max-w-xs">
            <Search setQuery={setQuery} />
          </div>
        </div>
        :
        null
      }
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
      {(page && setPage && paginationData) && (
        <Table.Pagination
          page={page}
          setPage={setPage}
          paginationData={paginationData}
        />
      )}
    </>
  )
}

const TableComponent = Object.assign(Component, {})

export default TableComponent;
