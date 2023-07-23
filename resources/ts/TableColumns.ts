
export const ServerColumns = [
    {
        name: "MOD",
        i18nKey: "mod"
    },
    {
        name: "OS",
        i18nKey: "os"
    },
    {
        name: "VAC",
        i18nKey: "vac"
    },
    {
        name: "HostName",
        i18nKey: "host_name"
    },
    {
        name: "Players",
        i18nKey: "players"
    },
    {
        name: "Map",
        i18nKey: "map"
    },
    {
        name: "Ping",
        i18nKey: "ping"
    }
]

export const PlayersColumns = [
    {
        name: "Name",
        i18nKey: "name"
    },
    {
        name: "Score",
        i18nKey: "score"
    },
    {
        name: "Time",
        i18nKey: "time"
    }
]

export const BansColumns = [
    {
        name: 'MOD/Country',
        i18nKey: 'mod_country'
    },
    {
        name: 'Date/Time',
        i18nKey: 'datetime'
    },
    {
        name: 'Player',
        i18nKey: 'player'
    },
    {
        name: 'Admin',
        i18nKey: 'admin'
    },
    {
        name: 'Length',
        i18nKey: 'length'
    },
    {
        name: 'Progress',
        i18nKey: 'progress'
    }
]

export const MutesColumns = [
    {
        name: 'MOD/Type',
        i18nKey: 'mod_type'
    },
    {
        name: 'Date/Time',
        i18nKey: 'datetime'
    },
    {
        name: 'Player',
        i18nKey: 'player'
    },
    {
        name: 'Admin',
        i18nKey: 'admin'
    },
    {
        name: 'Length',
        i18nKey: 'length'
    },
    {
        name: 'Progress',
        i18nKey: 'progress'
    }
]

export const AdminColumns = [
    {
        name: 'ID',
        i18nKey: 'id'
    },
    {
        name: 'Name',
        i18nKey: 'name'
    },
    {
        name: 'Email',
        i18nKey: 'email'
    },
    {
        name: 'Steam ID',
        i18nKey: 'steam_id'
    },
    {
        name: 'Is Verified',
        i18nKey: 'is_verified'
    },
    {
        name: 'Role',
        i18nKey: 'role'
    },
    {
        name: 'Immunity',
        i18nKey: 'immunity'
    }
]

export const AdminServerColumns = [
    {
        name: 'ID',
        i18nKey: 'id'
    },
    ...ServerColumns
]

export const AdminBansColumns = [
    {
        name: 'ID',
        i18nKey: 'id'
    },
    ...BansColumns
]

export const AdminMutesColumns = [
    {
        name: 'ID',
        i18nKey: 'id'
    },
    ...MutesColumns
]

export const RolesColumns = [
    {
        name: 'ID',
        i18nKey: "id"
    },
    {
        name: 'Name',
        i18nKey: "name"
    },
    {
        name: 'Description',
        i18nKey: "generic.description",
        ns: 'translations'
    },
    {
        name: 'Users Count',
        i18nKey: "users_count"
    },
    {
        name: 'Permissions Count',
        i18nKey: "permissions_count"
    },
    {
        name: 'Created At',
        i18nKey: "generic.created_at",
        ns: 'translations'
    },
    {
        name: 'Updated At',
        i18nKey: "generic.updated_at",
        ns: 'translations'
    }
]

export const GroupsColumns = [
    {
        name: 'ID',
        i18nKey: "id"
    },
    {
        name: 'Name',
        i18nKey: "name"
    },
    {
        name: 'Type',
        i18nKey: "type"
    },
    {
        name: 'Description',
        i18nKey: "generic.description",
        ns: 'translations'
    },
    {
        name: 'Created At',
        i18nKey: "generic.created_at",
        ns: 'translations'
    },
    {
        name: 'Updated At',
        i18nKey: "generic.updated_at",
        ns: 'translations'
    }
]

export const ModsColumns = [
    {
        name: 'ID',
        i18nKey: "id"
    },
    {
        name: 'Icon',
        i18nKey: "icon"
    },
    {
        name: 'Name',
        i18nKey: "name"
    },
    {
        name: 'Enabled',
        i18nKey: "enabled"
    },
]
