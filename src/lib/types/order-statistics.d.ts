export type TOrderStatisticsByStatus = {
    _id: string;
    count: number;
}

export type TDailyRevenue = {
    _id: string;
    revenue: number;
    count: number;
}

export type TMonthlyRevenue = {
    _id: string;
    revenue: number;
    count: number;
}

export type TOrderStatistics = {
    "message": "string",
    "statistics": {
        "ordersByStatus": TOrderStatisticsByStatus[],
        "dailyRevenue": TDailyRevenue[],
        "monthlyRevenue": TMonthlyRevenue[]
    }
}