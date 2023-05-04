export function search(data, query, keys) {
    return data.filter((item) =>
        keys.some((key) => {
            if (item[key] == null) {
                return null
            }

            return item[key].toLowerCase().includes(query)
        })
    )
}
