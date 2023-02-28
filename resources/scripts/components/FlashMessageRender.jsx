import { useFlashesStore } from "@/stores/flashes"
import { Fragment } from 'react';

const style = (type) => {
  switch (type) {
    case 'error':
      return `bg-red-600 border-red-800`;
    case 'info':
      return `bg-primary-600 border-primary-800`;
    case 'success':
      return `bg-green-600 border-green-800`;
    case 'warning':
      return `bg-yellow-600 border-yellow-800`;
    default:
      return '';
  }
}

const styleBackground = (type) => {
  switch (type) {
    case 'error':
      return `bg-red-500`;
    case 'info':
      return `bg-primary-500`;
    case 'success':
      return `bg-green-500`;
    case 'warning':
      return `bg-yellow-500`;
    default:
      return '';
  }
}

function FlashMessageRender({ byKey, className }) {
  const flashes = useFlashesStore((state) => state.items.filter(flash => (byKey ? flash.key === byKey : true)));

  return flashes.length ? (
    <div className={`${className ?? ''}`}>
      {flashes.map((flash, index) => (
        <Fragment key={flash.id || flash.type + flash.message}>
        { index > 0 && <div className="mt-2"/> }
        <div className={`p-2 border items-center leading-normal rounded flex w-full text-sm text-white ${style(flash.type)}`}>
          {flash.title && (
            <span
              className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 leading-none ${styleBackground(flash.type)}`}
            >
              {flash.title}
            </span>
          )}
          <span className="mr-2 text-left flex-auto">
            {flash.message}
          </span>
        </div>
      </Fragment>
      ))}
    </div>
  ) : null
}

export { FlashMessageRender }
