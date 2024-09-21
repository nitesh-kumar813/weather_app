
export const fetchWeatherData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Data not found.");
      }
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message || "Failed to fetch data.");
  }
};

// Date formatting 
export const formatDate = (timestamp, options = { weekday: "short", day: "numeric", month: "short" }) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", options);
};

// Time  (for hours and AM/PM)
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000); 
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};
