import classNames from "classnames";

function Box({ title, description, paragraph, borderColor, className }) {

  return (
    <div className={classNames('p-4 border-l-2 rounded bg-dark max-w-md w-full h-40', borderColor, className)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg">{title}</h1>
        <div>{description}</div>
        {paragraph && (
          <div>{paragraph}</div>
        )}
      </div>
    </div>
  )
}

export { Box }
