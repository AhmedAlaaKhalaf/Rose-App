export type TCategory = {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
};

export type TCategoryStatistics = {
  statistics: TCategory[];
};
export type TOverAllStatistics = {
  statistics: {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
  };
};

type TStatisticsObject = TOverAllStatistics["statistics"];

type TStatisticsArray = {
  name: keyof TStatisticsObject;
  value: TStatisticsObject[keyof TStatisticsObject];
}[];
