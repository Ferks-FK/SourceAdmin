import { object, string, ref, number, date, boolean, mixed } from 'yup';
import { useTranslation } from "react-i18next";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const steamIDRegex = /^STEAM_[0-1]:[0-1]:\d{1,10}$|^\d{17}$/;
const IPAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPAddressOrDomainRegex = /^(?:(?:https?|http):\/\/)?(?:[a-zA-Z0-9]+\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?:\/\S*)?$/;
const PortRegex = /^(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5]))))$/;

const validateField = ({ validationType = 'string', ...props }) => {
    const validationMessages = {
        required: props.requiredMessage,
        regex: props.regexMessage,
        min: props.minMessage,
        oneOf: props.oneOfMessage,
        email: props.emailMessage
    };

    let validation = null;

    switch (validationType) {
        case 'string':
            validation = string();
            break
        case 'number':
            validation = number();
            break
        case 'date':
            validation = date();
            break
        case 'boolean':
            validation = boolean();
            break
        case 'mixed':
            validation = mixed();
            break
        default:
            validation = string();
    }

    if (props.required) {
        validation = validation.required(validationMessages.required);
    }

    if (props.email) {
        validation = validation.email(validationMessages.email)
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

export const LoginFormSchema = () => {
    const { t } = useTranslation();

    return object().shape({
        name: validateField({
            required: true,
            requiredMessage: t('login.name_required')
        }),
        password: validateField({
            required: true,
            requiredMessage: t('login.password_required')
        })
    })
}

export const AdminCreateSchema = () => {
    return object().shape({
        name: validateField({
            required: true,
            requiredMessage: 'The admin name is required.'
        }),
        email: validateField({
            required: true,
            requiredMessage: 'The email is required.',
            email: true,
            emailMessage: 'The email is not valid.'
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
        password_confirmation: validateField({
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
            requiredMessage: 'The email is required.',
            email: true,
            emailMessage: 'The email is not valid.'
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
            min: 8,
            minMessage: 'Your password is too short.',
            regex: passwordRegex,
            regexMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
        new_password_confirmation: validateField({
            oneOf: [ref('new_password')],
            oneOfMessage: 'The passwords do not match.'
        })
    })
}

export const AppealFormSchema = () => {
    return object().shape({
        player_steam_id: validateField({
            regex: steamIDRegex,
            regexMessage: 'Invalid Steam ID.'
        }),
        player_ip: validateField({
            regex: IPAddressRegex,
            regexMessage: 'IP Address invalid.'
        }),
        player_name: validateField({
            required: true,
            requiredMessage: 'The player name is required.'
        }),
        player_email: validateField({
            required: true,
            requiredMessage: 'Your email address is required.',
            email: true,
            emailMessage: 'The email is not valid.'
        }),
        reason: validateField({
            required: true,
            requiredMessage: 'The reason is required.'
        })
    }).test(function (value) {
        const { player_steam_id, player_ip } = value;

        if (!player_steam_id && !player_ip) {
            return this.createError({
                message: 'At least one of the following fields must be provided: Steam ID, Player IP.',
                path: 'player_steam_id'
            })
        }

        return true;
    })
}

export const ReportFormSchema = () => {
    return object().shape({
        player_steam_id: validateField({
            regex: steamIDRegex,
            regexMessage: 'Invalid Steam ID.'
        }),
        player_ip: validateField({
            regex: IPAddressRegex,
            regexMessage: 'IP Address invalid.'
        }),
        player_name: validateField({
            required: true,
            requiredMessage: 'The player name is required.'
        }),
        comments: validateField({
            required: true,
            requiredMessage: 'The comments is required.'
        }),
        reporter_name: validateField({}), // There is no validation to do.
        reporter_email: validateField({
            required: true,
            requiredMessage: 'Your email address is required.',
            email: true,
            emailMessage: 'The email is not valid.'
        })
    }).test(function (value) {
        const { player_steam_id, player_ip } = value;

        if (!player_steam_id && !player_ip) {
            return this.createError({
                message: 'At least one of the following fields must be provided: Steam ID, Player IP.',
                path: 'player_steam_id'
            })
        }

        return true;
    })
}

export const ServerEditSchema = () => {
    return object().shape({
        ip: validateField({
            required: true,
            requiredMessage: "The ip/domain is required.",
            regex: IPAddressOrDomainRegex,
            regexMessage: 'The IP/Domain is not valid.'
        }),
        port: validateField({
            required: true,
            requiredMessage: 'The port is required.',
            regex: PortRegex,
            regexMessage: 'The port is not valid.'
        }),
        rcon: validateField({
            required: true,
            requiredMessage: 'The RCON is required.',
        }),
        new_rcon: validateField({
            min: 8,
            minMessage: 'Your RCON is too short.',
            regex: passwordRegex,
            regexMessage: 'RCON must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
        new_rcon_confirmation: validateField({
            oneOf: [ref('new_rcon')],
            oneOfMessage: "The RCON's do not match."
        })
    })
}

export const ServerCreateSchema = () => {
    return object().shape({
        ip: validateField({
            required: true,
            requiredMessage: "The ip/domain is required.",
            regex: IPAddressOrDomainRegex,
            regexMessage: 'The IP/Domain is not valid.'
        }),
        port: validateField({
            required: true,
            requiredMessage: 'The port is required.',
            regex: PortRegex,
            regexMessage: 'The port is not valid.'
        }),
        rcon: validateField({
            required: true,
            requiredMessage: 'The RCON is required.',
            min: 8,
            minMessage: 'Your RCON is too short.',
            regex: passwordRegex,
            regexMessage: 'RCON must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
        rcon_confirmation: validateField({
            required: true,
            requiredMessage: 'The RCON Confirm is required.',
            oneOf: [ref('rcon')],
            oneOfMessage: "The RCON's do not match."
        }),
        mod_id: validateField({
            required: true,
            requiredMessage: 'The MOD is required.'
        }),
        region_id: validateField({
            required: true,
            requiredMessage: 'The Region is required.'
        })
    })
}

export const BanEditSchema = () => {
    return object().shape({
        reason_id: validateField({
            required: true,
            requiredMessage: 'The Reason is required.'
        }),
        time_ban_id: validateField({
            required: true,
            requiredMessage: 'The Ban Length is required.'
        })
    })
}

export const BanCreateSchema = () => {
    return object().shape({
        ip: validateField({
            regex: IPAddressRegex,
            regexMessage: 'The IP is not valid.'
        }),
        steam_id: validateField({
            regex: steamIDRegex,
            regexMessage: 'The Steam ID is invalid.'
        }),
        player_name: validateField({
            required: true,
            requiredMessage: 'The player name is required.'
        }),
        time_ban_id: validateField({
            required: true,
            requiredMessage: 'The Ban Length is required.'
        }),
        admin_id: validateField({
            required: true,
            requiredMessage: 'The Admin is required.'
        }),
        reason_id: validateField({
            required: true,
            requiredMessage: 'The Reason is required.'
        }),
    }).test(function (value) {
        const { ip, steam_id } = value;

        if (!ip && !steam_id) {
            return this.createError({
                message: 'At least one of the following fields must be provided: Steam ID, Player IP.',
                path: 'ip'
            })
        }

        return true;
    })
}

export const MuteEditSchema = () => {
    return object().shape({
        reason_id: validateField({
            required: true,
            requiredMessage: 'The Reason is required.'
        }),
        time_ban_id: validateField({
            required: true,
            requiredMessage: 'The Ban Length is required.'
        })
    })
}

export const MuteCreateSchema = () => {
    return object().shape({
        ip: validateField({
            regex: IPAddressRegex,
            regexMessage: 'The IP is not valid.'
        }),
        steam_id: validateField({
            regex: steamIDRegex,
            regexMessage: 'The Steam ID is invalid.'
        }),
        player_name: validateField({
            required: true,
            requiredMessage: 'The player name is required.'
        }),
        time_ban_id: validateField({
            required: true,
            requiredMessage: 'The Ban Length is required.'
        }),
        admin_id: validateField({
            required: true,
            requiredMessage: 'The Admin is required.'
        }),
        reason_id: validateField({
            required: true,
            requiredMessage: 'The Reason is required.'
        }),
    }).test(function (value) {
        const { ip, steam_id } = value;

        if (!ip && !steam_id) {
            return this.createError({
                message: 'At least one of the following fields must be provided: Steam ID, Player IP.',
                path: 'ip'
            })
        }

        return true;
    })
}

