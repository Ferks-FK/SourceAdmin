import { useEffect } from "react";
import { useFlashesStore } from "@/stores/flashes";
import { separateInternalObjects } from "@/helpers";

export function useFlashMessages(flash, errors = {}) {
    const [ addFlash, addError, clearFlashes ] = useFlashesStore((state) => [ state.addFlash, state.addError, state.clearFlashes ])

    useEffect(() => {
        clearFlashes()

        if (flash.success) {
            addFlash({
                type: 'success',
                title: 'Success',
                message: flash.success
            })
        }

        if (flash.info) {
            addFlash({
                type: 'info',
                title: 'Info',
                message: flash.info
            })
        }

        if (flash.warning) {
            addFlash({
                type: 'warning',
                title: 'Warning',
                message: flash.warning
            })
        }

        if (flash.error) {
            addError({
                message: flash.error
            })
        }

        if (errors) {
            const array = separateInternalObjects(Object.values(errors))

            array.forEach((error, index) => {
                const key = Object.keys(error)[0]
                const value = error[key]
                addError({
                    message: { [index]: value }[index]
                })
            })
        }
    }, [flash])
}
