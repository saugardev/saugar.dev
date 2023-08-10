'use client'

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarWrapper() {
  const [date, setDate] = useState<Date[] | undefined>([]);

  return (
    <Calendar
      mode="multiple"
      selected={date}
      onSelect={setDate}
      className=""
    />
  )
}
