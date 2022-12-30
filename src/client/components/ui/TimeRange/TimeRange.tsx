import React, { useCallback } from 'react';

interface TimeRangeProps {
  end: string
  start: string
}

export function TimeRange({ end, start }: TimeRangeProps) {
  const formatTime = useCallback((time: string) => {
    const split = time.split(':');
    return `${split[0]}h${split[1] !== '00' ? split[1] : ''}`;
  }, []);

  return (
    <>
      <time dateTime={start}>{formatTime(start)}</time>
      {' - '}
      <time dateTime={end}>{formatTime(end)}</time>
    </>
  );
}
