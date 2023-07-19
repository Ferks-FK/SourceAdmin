import { object, string, ref, number, array } from 'yup';
import { fieldType, FieldObject } from '@/yup/YupFields';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const steamIDRegex = /^STEAM_[0-1]:[0-1]:\d{1,10}$|^\d{17}$/;
const IPAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPAddressOrDomainRegex = /^(?:(?:https?|http):\/\/)?(?:[a-zA-Z0-9]+\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?:\/\S*)?$/;
const PortRegex = /^(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5]))))$/;

const RequiredMultipleFields = (fields: FieldObject[]) => {
    return fieldType(fields).following_fields
}

export const LoginFormSchema = () => object().shape({
    name: string().required(fieldType('name_or_email').required),
    password: string().required(fieldType('password').required)
})

export const AdminCreateSchema = () => object().shape({
    name: string().required(fieldType('admin_name', 'admin_settings').required),
    email: string().required(fieldType('email').required).email(fieldType('email').invalid),
    steam_id: string().required(fieldType('steam_id').required).matches(steamIDRegex, fieldType('steam_id').invalid),
    role: number().required(fieldType('role', 'role_settings').required),
    groups: array(),
    password: string().required(fieldType('admin_password', 'admin_settings').required).min(8, fieldType('password').short).matches(passwordRegex, fieldType('password').match),
    password_confirmation: string().required(fieldType('confirm_new_password').required).oneOf([ref('password')], fieldType('passwords').password)
})

export const AdminEditSchema = () => object().shape({
    name: string().required(fieldType('admin_name', 'admin_settings').required),
    email: string().required(fieldType('email').required).email(fieldType('email').invalid),
    steam_id: string().required(fieldType('steam_id').required).matches(steamIDRegex, fieldType('steam_id').invalid),
    role: number().required(fieldType('role', 'role_settings').required),
    groups: array(),
    current_password: string().required(fieldType('current_password').required),
    new_password: string().min(8, fieldType('new_password').short).matches(passwordRegex, fieldType('new_password').password),
    new_password_confirmation: string().oneOf([ref('new_password')], fieldType('confirm_password').match)
})

export const AppealFormSchema = () => {
    const required = RequiredMultipleFields([
        {
            i18nKey: 'steam_id'
        },
        {
            i18nKey: 'player_ip',
            group: 'report'
        }
    ])

    return object().shape({
        player_steam_id: string().matches(steamIDRegex, fieldType('steam_id').invalid).when('player_ip', {
            is: (player_ip: string) => !player_ip || player_ip.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_ip: string().matches(IPAddressRegex, fieldType('ip_address').invalid).when('player_steam_id', {
            is: (player_steam_id: string) => !player_steam_id || player_steam_id.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_name: string().required(fieldType('player_name', 'report').required),
        reason: string().required(fieldType('reason', 'generic').required),
        player_email: string().required(fieldType('email').your).email(fieldType('email').invalid),

    }, [['player_steam_id', 'player_ip']])
}

export const ReportFormSchema = () => {
    const required = RequiredMultipleFields([
        {
            i18nKey: 'steam_id'
        },
        {
            i18nKey: 'player_ip',
            group: 'report'
        }
    ])

    return object().shape({
        player_steam_id: string().matches(steamIDRegex, fieldType('steam_id').match).when('player_ip', {
            is: (player_ip: string) => !player_ip || player_ip.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_ip: string().matches(IPAddressRegex, fieldType('ip_address').invalid).when('player_steam_id', {
            is: (player_steam_id: string) => !player_steam_id || player_steam_id.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_name: string().required(fieldType('player_name', 'report').required),
        comments: string().required(fieldType('comments', 'report').required),
        reporter_name: string(),
        reporter_email: string().required(fieldType('email').your).email(fieldType('email').invalid),
        server_id: number().required(fieldType('server', 'servers').required)
    }, [['player_steam_id', 'player_ip']])
}

export const ServerEditSchema = () => object().shape({
    ip: string().required(fieldType('ip/domain').required).matches(IPAddressOrDomainRegex, fieldType('ip/domain').invalid),
    port: string().required(fieldType('port').required).matches(PortRegex, fieldType('port').invalid),
    rcon: string().required(fieldType('current_rcon', 'servers_settings').required),
    new_rcon: string().min(8, fieldType('new_rcon', 'servers_settings').short).matches(passwordRegex, fieldType('rcon').password),
    new_rcon_confirmation: string().oneOf([ref('new_rcon')], fieldType('confirm_new_rcon', 'servers_settings').match)
})

export const ServerCreateSchema = () => {
    return object().shape({
        ip: string().required(fieldType('ip/domain').required).matches(IPAddressOrDomainRegex, fieldType('ip/domain').invalid),
        port: string().required(fieldType('port').required).matches(PortRegex, fieldType('port').invalid),
        rcon: string().required(fieldType('server_rcon', 'servers_settings').required).min(8, fieldType('rcon').short).matches(passwordRegex, fieldType('rcon').password),
        rcon_confirmation: string().required(fieldType('confirm_rcon', 'servers_settings').required).oneOf([ref('rcon')], fieldType('rcon').match),
        mod_id: number().required(fieldType('server_mod', 'servers_settings').required),
        region_id: number().required(fieldType('server_region', 'servers_settings').required)
    })
}

export const BanEditSchema = () => object().shape({
    reason_id: number().required(fieldType('reason', 'generic').required),
    time_ban_id: number().required(fieldType('ban_length').required)
})

export const BanCreateSchema = () => {
    const required = RequiredMultipleFields([
        {
            i18nKey: 'steam_id'
        },
        {
            i18nKey: 'player_ip',
            group: 'report'
        }
    ])

    return object().shape({
        ip: string().matches(IPAddressRegex, fieldType('player_ip', 'report').invalid).when('steam_id', {
            is: (steam_id: string) => !steam_id || steam_id.length == 0,
            then: (schema) => schema.required(required)
        }),
        steam_id: string().matches(steamIDRegex, fieldType('steam_id').invalid).when('ip', {
            is: (ip: string) => !ip || ip.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_name: string().required(fieldType('player_name', 'report').required),
        time_ban_id: number().required(fieldType('length', 'generic').required),
        admin_id: number().required(fieldType('admin', 'generic').required),
        reason_id: number().required(fieldType('reason', 'generic').required)
    }, [['ip', 'steam_id']])
}

export const MuteEditSchema = () => object().shape({
    reason_id: number().required(fieldType('reason', 'generic').required),
    time_ban_id: number().required(fieldType('length', 'generic').required)
})

export const MuteCreateSchema = () => {
    const required = RequiredMultipleFields([
        {
            i18nKey: 'steam_id'
        },
        {
            i18nKey: 'player_ip',
            group: 'report'
        }
    ])

    return object().shape({
        ip: string().matches(IPAddressRegex, fieldType('player_ip', 'report').invalid).when('steam_id', {
            is: (steam_id: string) => !steam_id || steam_id.length == 0,
            then: (schema) => schema.required(required)
        }),
        steam_id: string().matches(steamIDRegex, fieldType('steam_id').invalid).when('ip', {
            is: (ip: string) => !ip || ip.length == 0,
            then: (schema) => schema.required(required)
        }),
        player_name: string().required(fieldType('player_name', 'report').required),
        time_ban_id: number().required(fieldType('length', 'generic').required),
        admin_id: number().required(fieldType('admin', 'generic').required),
        reason_id: number().required(fieldType('reason', 'generic').required)
    }, [['ip', 'steam_id']])
}

export const GroupEditSchema = () => object().shape({
    name: string().required(fieldType('group_name', 'groups_settings').required),
    description: string(),
    type: string().required(fieldType('group_type', 'groups_settings').min_options)
})

export const GroupCreateSchema = () => object().shape({
    name: string().required(fieldType('group_name', 'groups_settings').required),
    description: string(),
    type: string().required(fieldType('group_type', 'groups_settings').min_options)
})

export const RoleEditSchema = () => object().shape({
    name: string().required(fieldType('role_name', 'role_settings').required),
    description: string(),
    permissions: array().required(fieldType('permissions', 'role_settings').required).min(1, fieldType('permissions', 'role_settings').min_options)
})

export const RoleCreateSchema = () => object().shape({
    name: string().required(fieldType('role_name', 'role_settings').required),
    description: string(),
    permissions: array().required(fieldType('permissions', 'role_settings').required).min(1, fieldType('permissions', 'role_settings').min_options)
})

