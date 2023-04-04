export function search(data, query, keys) {
    const search = () => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        )
    }

    return search(data)
}
