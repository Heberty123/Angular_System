
export interface Series {
    name: string,
    value: number
}

export interface SeriesDashboard {
    name: string,
    series: Series[]
}