import { lowerCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/elements/button";
import { iconPosition } from "@/components/elements/button/types";
import { TableProps, TDProps, HeaderProps, RowProps, SizeRowProps, PaginationProps } from "@/components/elements/table/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./style.module.css"

const Table = ({ columns, children, className, ...props }: TableProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={classNames(styles.container, className)}>
        <table className={styles.table}>
          <thead className={styles.thread}>
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
              <Row className={'!cursor-not-allowed'}>
                <Td colSpan={7}>
                  <div className="text-center">
                    {t('no_data_found', { ns: 'table' })}
                  </div>
                </Td>
              </Row>
              :
              children
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

const Header = ({ title, icon, iconSize = 'lg', children, className }: HeaderProps) => (
  <div className={classNames(styles.header, className)}>
    {title && (
      <h1>
        {icon && <FontAwesomeIcon icon={icon} size={iconSize}/>}&nbsp;
        {title}
      </h1>
    )}
    {children}
  </div>
)

const Row = ({ className, children, size = SizeRowProps.Sm, ...props }: RowProps) => {
  const trSize = () => {
    switch (size) {
      case 'sm':
        return 'h-10'
      case 'base':
        return 'h-14'
      default:
        return 'h-10'
    }
  }

  return (
    <tr
      className={classNames(styles.row, trSize(), className)}
      {...props}
      >
      {children}
    </tr>
  )
}

const Td = ({ className, children, ...props }: TDProps) => (
  <td className={classNames('px-6', className)} {...props}>
    {children}
  </td>
)

const Pagination = ({paginationData}: PaginationProps) => {

  const {
    currentPage,
    lastPage,
    nextPageUrl,
    prevPageUrl,
    firstPageUrl,
    lastPageUrl,
    from,
    to,
    total
  } = paginationData

  return (
    <div className={styles.pagination_container}>
      <p className="text-sm">Showing: {from} to {to} of {total}</p>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <Button.IconLink
            key={'first'}
            to={firstPageUrl}
            disabled={currentPage == 1}
            icon={faAnglesLeft}
            iconSize={'sm'}
          />
          <Button.IconLink
            key={'previous'}
            to={prevPageUrl}
            disabled={currentPage == 1}
            icon={faChevronLeft}
            iconSize={'sm'}
            iconPosition={iconPosition.Left}
          >
            Previous
          </Button.IconLink>
        </div>
        <div className="flex gap-1">
          <Button.IconLink
            key={'next'}
            to={nextPageUrl}
            disabled={currentPage == lastPage}
            className={'border-none rounded'}
            icon={faChevronRight}
            iconSize={'sm'}
            iconPosition={iconPosition.Right}
          >
            Next
          </Button.IconLink>
          <Button.IconLink
            key={'last'}
            to={lastPageUrl}
            disabled={currentPage == lastPage}
            icon={faAnglesRight}
            iconSize={'sm'}
          />
        </div>
      </div>
    </div>
  );
}

const _Table = Object.assign(Table, {
  Component: Table,
  Td: Td,
  Row: Row,
  Header: Header,
  Pagination: Pagination
})

export default _Table
