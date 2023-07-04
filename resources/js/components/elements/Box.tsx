import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string,
  description: string,
  paragraph?: string,
  borderColor?: string
}

function Box({ title, description, paragraph, borderColor, className }: Props) {

  return (
    <div className={classNames('p-4 border-l-2 rounded bg-dark-primary max-w-md w-full min-h-[11rem] h-auto', borderColor, className)}>
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
