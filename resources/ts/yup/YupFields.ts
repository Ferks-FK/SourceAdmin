import { useTranslation } from "react-i18next"

export interface FieldObject {
    i18nKey: string
    group?: string
    ns?: string
}

export const fieldType = (field: string | Array<FieldObject>, group: string = 'yup_schemas', ns = 'translations') => {
    const { i18n, t } = useTranslation()
    const groupKey = group.endsWith('.') ? group + field : group + '.' + field
    const attribute = i18n.exists(groupKey) ? t(groupKey) : field
    let fields: string[] = []

    if (Array.isArray(field)) {
        fields = field.map(({ i18nKey, group = 'yup_schemas', ns = 'translations' }) => {
            return t(group + "." + i18nKey, {ns: ns})
        })
    }

    return {
        required: t('yup_schemas.required_attribute', {attribute: attribute, ns: ns}),
        invalid: t('yup_schemas.invalid_attribute', {attribute: attribute, ns: ns}),
        password: t('yup_schemas.password_attribute', {attribute: attribute, ns: ns}),
        short: t('yup_schemas.short_attribute', {attribute: attribute, ns: ns}),
        match: t('yup_schemas.match_attribute', {attribute: attribute, ns: ns}),
        your: t('yup_schemas.your_attribute', {attribute: attribute, ns: ns}),
        min_options: t('yup_schemas.min_options_attribute', {attribute: attribute, ns: ns}),
        following_fields: t('yup_schemas.following_fields_attribute', {attribute: fields.join(', '), ns: ns})
    }
}

