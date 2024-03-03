export function timeAgo(dateString) {
    const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date; // difference in milliseconds
  const diffHrs = diffMs / (1000 * 60 * 60); // convert milliseconds to hours

  if (diffHrs < 24) {
    // If less than 24 hours ago, format as time
    return date.toLocaleTimeString();
  } else {
    // If more than 24 hours ago, format as date
    return date.toLocaleDateString();
  }
  }