export function ParseErrors(clearAndAddHttpError, searchParams) {
    const errorsMessages = {
        steam_user_not_found: 'We could not find a user related to your steam account.',
        steam_validate_failed: 'Failed to validate your steam account.'
    };

    searchParams.getAll('error').map((error) => {
    const hasKey = errorsMessages.hasOwnProperty(error)

    clearAndAddHttpError({
            key: error,
            error: {
                message: hasKey ? errorsMessages[error] : 'Message not found.'
            }
        })
    })
}
