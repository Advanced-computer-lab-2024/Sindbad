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
    const response = await axiosInstance.get(
      `/sale/my-sales/${type}/${creatorId}`,
      {
        resourceName: "Sale",
      }
    );
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

export const filterAndGroupSalesByItem = (
  salesData,
  limit,
  from = null,
  to = null
) => {
  // Filter sales data based on the date range or exact date
  const filteredSalesData = salesData.filter((sale) => {
    const saleDate = new Date(sale.createdAt).setHours(0, 0, 0, 0); // Normalize sale date for comparison
    const fromDate = from ? new Date(from).setHours(0, 0, 0, 0) : null;
    const toDate = to ? new Date(to).setHours(23, 59, 59, 999) : null;

    // Case 1: No filters (both from and to are null)
    if (!fromDate && !toDate) return true;

    // Case 2: Only fromDate is set (exact match for fromDate)
    if (fromDate && !toDate) return saleDate === fromDate;

    // Case 3: Both fromDate and toDate are set (date range filtering)
    return (
      (!fromDate || saleDate >= fromDate) && (!toDate || saleDate <= toDate)
    );
  });

  // Group by item and sum revenue
  const groupedData = filteredSalesData.reduce((acc, sale) => {
    const existingItem = acc.find((item) => item.itemId === sale.itemId);
    if (existingItem) {
      existingItem.revenue += sale.revenue;
      existingItem.count += existingItem.quantity || 1;
    } else {
      acc.push({ itemId: sale.itemId, revenue: sale.revenue, count: 1 });
    }
    return acc;
  }, []);

  // Sort and limit the results
  return groupedData.sort((a, b) => b.count - a.count).slice(0, limit);
};
