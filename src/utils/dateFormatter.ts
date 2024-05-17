
export function formatChatTime(date: any) {

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Check if the date is invalid after conversion or if it's still not a Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'fail';
  }

  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else if (diffInHours < 48) {
    return `Kemarin, ${date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  } else {
    const day = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const time = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${day}, ${time}`;
  }
}