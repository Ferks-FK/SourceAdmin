import { Fragment, useEffect, useState } from 'react';
import { useFlashesStore } from "@/stores/flashes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';

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
  const [ flashes, clearFlashes ] = useFlashesStore((state) => [state.items.filter(flash => (byKey ? flash.key === byKey : true)), state.clearFlashes]);
  const [ renderFlash, setRenderFlash ] = useState(flashes.length >= 1 ? true : false);

  useEffect(() => {
    clearFlashes()
  }, [renderFlash])

  if (flashes.length == 0) return null

  if (flashes.length == 1) {
    const flash = flashes[0]

    return (
      <div className={`${className ?? ''}`}>
        <div className={`p-2 border items-center leading-normal rounded flex justify-between w-full text-sm text-white ${style(flash.type)}`}>
          <div className="flex items-center">
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
          <div className='cursor-pointer' onClick={() => setRenderFlash(!renderFlash)}>
            <FontAwesomeIcon icon={faClose} size='lg'/>
          </div>
        </div>
      </div>
    )
  }

  if (flashes.length > 1) {
    return (
      <div className={`${className ?? ''}`}>
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
      </div>
    )
  }
}

export { FlashMessageRender }
