import api from "../api/api.js";

const authHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export function getDateRange(days = 30) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const toDateString = (d) => d.toISOString().split("T")[0];

  return {
    startDate: toDateString(start),
    endDate: toDateString(end),
  };
}

export async function fetchMyUrls(token) {
  const { data } = await api.get("/api/urls/myurls", authHeaders(token));
  return [...data].sort(
    (a, b) => new Date(b.dateTime) - new Date(a.dateTime),
  );
}

export async function fetchTotalClicks(token, startDate, endDate) {
  const { data } = await api.get(
    `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
    authHeaders(token),
  );

  return Object.keys(data)
    .sort()
    .map((clickDate) => ({
      clickDate,
      count: data[clickDate],
    }));
}

