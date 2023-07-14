import colors from 'tailwindcss/colors';
import { CSSObject } from '@emotion/react';
import {
    ControlProps,
    ClearIndicatorProps,
    StylesConfig,
    DropdownIndicatorProps
} from 'react-select';

const SelectStyle: StylesConfig<any, any, any> = {
    clearIndicator: (base: CSSObject, props: ClearIndicatorProps<any, any, any>): CSSObject => {
        return {
            ...base,
            color: props.isFocused ? colors.neutral[300] : colors.neutral[400],

            ':hover': {
                color: colors.neutral[100],
            },
        };
    },

    container: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    control: (base: CSSObject, props: ControlProps<any, any, any>): CSSObject => {
        return {
            ...base,
            minHeight: '3.2rem',
            backgroundColor: '#1e2327',
            cursor: 'pointer',

            ':hover': {
                borderColor: !props.isFocused ? colors.neutral[400] : '#212529',
            },
        };
    },

    dropdownIndicator: (base: CSSObject, props: DropdownIndicatorProps<any, any, any>): CSSObject => {
        return {
            ...base,
            color: props.isFocused ? colors.neutral[300] : colors.neutral[400],
            transform: props.isFocused ? 'rotate(180deg)' : undefined,
            ':hover': {
                color: colors.neutral[300],
            },
        };
    },

    group: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    groupHeading: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    indicatorsContainer: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    indicatorSeparator: (base: CSSObject): CSSObject => {
        return {
            ...base,
            backgroundColor: colors.neutral[500],

        };
    },

    input: (base: CSSObject): CSSObject => {
        return {
            ...base,
            color: colors.neutral[200],
            fontSize: '0.875rem',
        };
    },

    loadingIndicator: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    loadingMessage: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    menu: (base: CSSObject): CSSObject => {
        return {
            ...base,
            color: colors.neutral[200],
            backgroundColor: '#1e2327',
            paddingLeft: '5px',
        };
    },

    menuList: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    menuPortal: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    multiValue: (base: CSSObject): CSSObject => {
        return {
            ...base,
            background: colors.neutral[900],
            color: colors.neutral[200],
        };
    },

    multiValueLabel: (base: CSSObject): CSSObject => {
        return {
            ...base,
            color: colors.neutral[200],
        };
    },

    multiValueRemove: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    noOptionsMessage: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },

    option: (base: CSSObject): CSSObject => {
        return {
            ...base,
            background: '#1e2327',
            borderRadius: '5px',

            ':hover': {
                background: colors.neutral[700],
                cursor: 'pointer',
            },
            color: 'white'
        };
    },

    placeholder: (base: CSSObject): CSSObject => {
        return {
            ...base,
            color: colors.neutral[300],
            fontSize: '0.875rem',
        };
    },

    singleValue: (base: CSSObject): CSSObject => {
        return {
            ...base,
            color: '#00000',
        };
    },

    valueContainer: (base: CSSObject): CSSObject => {
        return {
            ...base,
        };
    },
}

export { SelectStyle }
