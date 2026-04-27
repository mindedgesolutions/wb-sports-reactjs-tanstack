import dayjs from 'dayjs';

export const parseDate = (data: Date) => {
  const y = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  const formatted = `${y}-${m}-${d}`;

  return formatted;
};

// ------------------------------

export const formatDate = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};
