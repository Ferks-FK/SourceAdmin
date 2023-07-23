import classNames from "classnames";

type Props = JSX.IntrinsicElements['textarea']

function TextArea({ name, rows = 5, className, ...props }: Props) {
  return (
    <textarea
      name={name}
      rows={rows}
      className={classNames('w-full p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 border-slate-200 hover:border-slate-400 transition-all duration-150 ease-in-out', className)}
      {...props}
    />
  )
}

export { TextArea }
