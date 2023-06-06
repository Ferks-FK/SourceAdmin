import { object, string, ref } from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const steamIDRegex = /^STEAM_[0-1]:[0-1]:\d{1,10}$|^\d{17}$/;

const validateField = ({ ...props }) => {
    const validationMessages = {
        required: props.requiredMessage,
        regex: props.regexMessage,
        min: props.minMessage,
        oneOf: props.oneOfMessage,
    };

    let validation = string();

    if (props.required) {
        validation = validation.required(validationMessages.required);
    }

    if (props.min) {
        validation = validation.min(props.min, validationMessages.min);
    }

    if (props.regex) {
        validation = validation.matches(props.regex, validationMessages.regex);
    }

    if (props.oneOf) {
        validation = validation.oneOf(props.oneOf, validationMessages.oneOf);
    }

    return validation;
};

export const AdminCreateSchema = () => {
    return object().shape({
        name: validateField({
            required: true,
            requiredMessage: 'The admin name is required.'
        }),
        email: validateField({
            required: true,
            requiredMessage: 'The email is required.'
        }),
        steam_id: validateField({
            required: true,
            requiredMessage: 'The steam id is required.',
            regex: steamIDRegex,
            regexMessage: 'Invalid Steam ID.'
        }),
        password: validateField({
            required: true,
            requiredMessage: 'The password is required.',
            min: 8,
            minMessage: 'Your password is too short.',
            regex: passwordRegex,
            regexMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
        confirm_password: validateField({
            required: true,
            requiredMessage: 'The confirm password is required.',
            oneOf: [ref('password')],
            oneOfMessage: 'The passwords do not match.'
        })
    })
}

export const AdminEditSchema = () => {
    return object().shape({
        name: validateField({
            required: true,
            requiredMessage: 'The admin name is required.'
        }),
        email: validateField({
            required: true,
            requiredMessage: 'The email is required.'
        }),
        steam_id: validateField({
            required: true,
            requiredMessage: 'The steam id is required.',
            regex: steamIDRegex,
            regexMessage: 'Invalid Steam ID.'
        }),
        current_password: validateField({
            required: true,
            requiredMessage: 'The current password is required.'
        }),
        new_password: validateField({
            required: true,
            requiredMessage: 'The new password is required.',
            min: 8,
            minMessage: 'Your password is too short.',
            regex: passwordRegex,
            regexMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
        new_password_confirm: validateField({
            required: true,
            requiredMessage: 'The confirm password is required.',
            oneOf: [ref('new_password')],
            oneOfMessage: 'The passwords do not match.'
        })
    })
}
