import { useEffect } from "react";
import { useFlashesStore } from "@/stores/flashes";

export function useFlashMessages(flash) {
    const [ addFlash, addError, clearFlashes ] = useFlashesStore((state) => [ state.addFlash, state.addError, state.clearFlashes ])

    console.log(flash)
    useEffect(() => {
        console.log(flash)
        clearFlashes()

        if (flash.success) {
            addFlash({
                type: 'success',
                title: 'Success',
                message: flash.success
            })
        }

        if (flash.error) {
            addError({
                message: flash.error
            })
        }
    }, [])
}
