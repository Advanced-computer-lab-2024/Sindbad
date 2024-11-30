import axiosInstance from "./axiosInstance";

export const getAllSales = async () => {
  try {
    const response = await axiosInstance.get("/sale/", {
      resourceName: "Sale",
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMySales = async (type, creatorId) => {
  try {
    const response = await axiosInstance.get(`/sale/my-sales/${type}/${creatorId}`, {
      resourceName: "Sale",
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const groupByDay = (data) => {
  if (!data) return [];

  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const yearDay = date.toISOString().split("T")[0];

    if (!groupedData[yearDay]) {
      groupedData[yearDay] = 0;
    }
    groupedData[yearDay] += item.revenue;
  });

  return Object.entries(groupedData).map(([date, revenue]) => ({
    date: new Date(date).getTime(),
    revenue,
  }));
};

export const calculateTotalSum = (data) => {
  return data.reduce((acc, item) => acc + item.revenue, 0).toFixed(2);
};

export const calculateSumThisYear = (data) => {
  const thisYear = new Date().getFullYear();
  return data
    .filter((item) => new Date(item.date).getFullYear() === thisYear)
    .reduce((acc, item) => acc + item.revenue, 0);
};

export const calculateSumLastYear = (data) => {
  const lastYear = new Date().getFullYear() - 1;
  return data
    .filter((item) => new Date(item.date).getFullYear() === lastYear)
    .reduce((acc, item) => acc + item.revenue, 0);
};

export const calculateRevenueTrend = (data) => {
  const thisYear = calculateSumThisYear(data);
  const lastYear = calculateSumLastYear(data);
  let trend = thisYear - lastYear;
  trend = trend.toFixed(2);
  return trend;
};

export const groupByItemAndSumRevenue = (data, limit = null) => {
  if (!data) return [];

  const groupedData = {};

  // Iterate through data to group by itemId and calculate revenue and count
  data.forEach((item) => {
    if (!groupedData[item.itemId]) {
      groupedData[item.itemId] = { revenue: 0, count: 0 };
    }
    groupedData[item.itemId].revenue += item.revenue; // Sum up revenue
    groupedData[item.itemId].count += 1; // Increment count
  });

  // Convert the grouped data into an array and sort it by revenue
  let sortedData = Object.entries(groupedData)
    .map(([itemId, { revenue, count }]) => ({ itemId, revenue, count }))
    .sort((a, b) => b.revenue - a.revenue); // Sort by revenue in descending order

  // Apply the limit if specified
  if (limit !== null) {
    sortedData = sortedData.slice(0, limit);
  }

  return sortedData;
};

