export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Handle "Present" or "Current"
  if (
    typeof dateString === "string" &&
    (dateString.toLowerCase() === "present" ||
      dateString.toLowerCase() === "current")
  ) {
    return "Present";
  }

  const date = new Date(dateString);

  // Check if valid date
  if (isNaN(date.getTime())) {
    return dateString; // Return as-is if invalid
  }

  // Format as "Month Year"
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const formatDateShort = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Format as "Mon YYYY" (e.g., "Sep 2020")
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
