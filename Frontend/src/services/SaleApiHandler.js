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

export const filterAndGroupSalesByItem = (salesData, limit, from = null, to = null) => {
  console.log("salesData", salesData);
  console.log("limit", limit);
  console.log("from", from);
  console.log("to", to);
  // Filter sales data based on the date range
  const filteredSalesData = salesData.filter((sale) => {
    const saleDate = new Date(sale.createdAt);
    return (
      (!from || saleDate >= new Date(from)) &&
      (!to || saleDate <= new Date(to))
    );
  });

  // Group by item and sum revenue
  const groupedData = filteredSalesData.reduce((acc, sale) => {
    const existingItem = acc.find((item) => item.itemId === sale.itemId);
    if (existingItem) {
      existingItem.revenue += sale.revenue;
      existingItem.count += 1;
    } else {
      acc.push({ itemId: sale.itemId, revenue: sale.revenue, count: 1 });
    }
    return acc;
  }, []);

  // Sort and limit the results
  return groupedData
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

