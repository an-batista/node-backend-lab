export function captureQueryParams(query) {
    return query.slice(1).split("&").reduce((queryParams, query) => {
        const [ key, value ] = query.split("=")
        queryParams[key] = value
        return queryParams
    }, {})
}