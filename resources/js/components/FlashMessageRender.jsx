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
      {flashes.length > 1 && (
        <div className={`p-2 border text-base leading-normal rounded flex flex-col w-full text-white ${style(flashes[0].type)}`}>
          <h1>There was an error validating the data provided.</h1>
          <div className="flex flex-col">
            {flashes.map((flash) => (
              <Fragment key={flash.id || flash.type + flash.message}>
                <div className="flex items-center">
                  <span className="pr-1">&bull;</span>
                  <span className="text-left text-sm">
                    {flash.message}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
      {/* {flashes.map((flash, index) => (
        <Fragment key={flash.id || flash.type + flash.message}>
          {flashes.length > 1 ? (
            <div className={`p-2 border items-center leading-normal rounded flex w-full text-sm text-white ${style(flash.type)}`}>
              There was an error validating the data provided.
              <div className="flex flex-col gap-2">
                {flash.message}
              </div>
            </div>
          ) : (
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
          )}
        </Fragment>
      ))} */}
    </div>
  ) : null
}

export { FlashMessageRender }
