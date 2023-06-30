import { useTranslation } from "react-i18next"

export interface FieldObject {
    i18nKey: string,
    group?: string,
    ns?: string
}

export const fieldType = (field: string | Array<FieldObject>, group: string = 'yup_schemas', ns = 'translations') => {
    const { i18n, t } = useTranslation()
    const groupKey = group.endsWith('.') ? group + field : group + '.' + field
    const attribute = i18n.exists(groupKey) ? t(groupKey) : field
    let fields = []

    if (Array.isArray(field)) {
        fields = field.map(({ i18nKey, group = 'yup_schemas', ns = 'translations' }) => {
            return t(group + "." + i18nKey, {ns: ns})
        })
    }

    return {
        required: t('yup_schemas.required_attribute', {attribute: attribute}),
        invalid: t('yup_schemas.invalid_attribute', {attribute: attribute}),
        password: t('yup_schemas.password_attribute', {attribute: attribute}),
        short: t('yup_schemas.short_attribute', {attribute: attribute}),
        match: t('yup_schemas.match_attribute', {attribute: attribute}),
        your: t('yup_schemas.your_attribute', {attribute: attribute}),
        following_fields: t('yup_schemas.following_fields_attribute', {attribute: fields.join(', ')})
    }
}

