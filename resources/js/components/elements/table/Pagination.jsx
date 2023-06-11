import { Button } from "@/components/elements/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const Component = ({ paginationData }) => {
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
  } = paginationData;

  console.log(paginationData)
  return (
    <div className={'flex flex-wrap items-center justify-center sm:justify-between gap-2'}>
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
            iconPosition={'left'}
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
            iconPosition="right"
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

const Pagination = Object.assign(Component, {})

export default Pagination
