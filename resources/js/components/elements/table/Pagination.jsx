import { Button } from "@/components/elements/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Component = ({ paginationData }) => {
  const {
    currentPage,
    lastPage,
    nextPageUrl,
    prevPageUrl,
    from,
    to,
    total
  } = paginationData;

  return (
    <div className={'flex flex-wrap items-center justify-center sm:justify-between gap-2'}>
      <p className="text-sm">Showing: {from} to {to} of {total}</p>
      <div className="flex items-center gap-2">
        <Button.IconLink
          key={'previous'}
          to={prevPageUrl}
          disabled={currentPage == 1}
          className={currentPage == 1 && 'cursor-not-allowed'}
          icon={faChevronLeft}
          iconSize={'sm'}
          iconPosition={'left'}
        >
          Previous
        </Button.IconLink>
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
      </div>
    </div>
  );
}

const Pagination = Object.assign(Component, {})

export default Pagination
