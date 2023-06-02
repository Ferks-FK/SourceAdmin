import classNames from "classnames";


function Box({ title, description, paragraph, borderColor }) {

  return (
    <div className={classNames('p-4 border-l-2 rounded bg-dark max-w-md w-full h-40', borderColor)}>
      <div className="flex flex-col gap-2">
        <h1>{title}</h1>
        <h2>{description}</h2>
        {paragraph && (
          <p>{paragraph}</p>
        )}
      </div>
    </div>
  )
}

export { Box }
