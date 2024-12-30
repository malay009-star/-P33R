export const dateFormat = (date) => {
  if (!date) return "";

  const dt = new Date(date);

  return dt.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const timeFormat = (date) => {
  if (!date) return "TBD";

  const dt = new Date(date);

  return dt.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const createdAtFormat = (date) => {
  if (!date) return "";

  const dt = new Date(date);

  const now = new Date();

  const diff = now.getTime() - dt.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "few seconds ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (hours < 48) return "yesterday";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const startEndTimeFormat = (start, end) => {
  if (!start || !end) return "TBD";

  return timeFormat(start) + (end ? " - " : "") + timeFormat(end);
};

export const numDays = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays)) return 1;
  if (diffDays < 0) return 1;

  return diffDays;
};

export const returnInputTD = (date) => {
  if (!date) return new Date();

  return new Date(date);
};
