'use client'

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"

interface CalendarWrapperProps {
  selectedDatesWithUrls?: { date: Date; url: string }[];
}

export default function CalendarWrapper({ selectedDatesWithUrls }: CalendarWrapperProps) {
  const [dates, setDate] = useState<Date[]>(
    selectedDatesWithUrls ? selectedDatesWithUrls.map((entry) => entry.date) : []
  );
  useEffect(() => {
    setDate(selectedDatesWithUrls ? selectedDatesWithUrls.map((entry) => entry.date): []);
  }, [selectedDatesWithUrls]);

  const handleDayClick = (date: Date) => {
    const url = selectedDatesWithUrls?.find((entry) => entry.date.getTime() === date.getTime())?.url;
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onDaySelected={handleDayClick}
      className=""
    />
  );
}
