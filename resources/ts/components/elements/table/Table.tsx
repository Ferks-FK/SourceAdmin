import { useTranslation } from "react-i18next";
import { TableProps, TDProps, HeaderProps, RowProps, SizeRowProps, PaginationProps } from "@/components/elements/table/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "@/components/elements/NavLink";
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
              {columns.map(({ name, i18nKey, ns = 'table' }) => (
                <td key={name.toLowerCase().replace(/[\/_]/g, '_')} className={'py-3 px-6'}>
                  {t(i18nKey, { ns: ns })}
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
        {icon && <FontAwesomeIcon icon={icon} size={iconSize} />}&nbsp;
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

const Pagination = (props: PaginationProps) => {
  const { links } = props.paginationData

  return (
    props.visible ?
      <div className={styles.pagination_container}>
        <ul className="flex gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                href={link.url ?? ''}
                className={classNames(styles.pagination_item, {
                  ['active']: link.active === true
                })}
                disabled={link.url == null}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      :
      null
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
