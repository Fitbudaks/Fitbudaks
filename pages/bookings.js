import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import MyCalendar from '../components/Calendar'

export default function Bookings() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function loadBookings() {
      const { data, error } = await supabase.from('classes').select('*')
      if (!error && data) {
        setEvents(data.map(c => ({
          id: c.id,
          title: c.title,
          start: new Date(c.start_time),
          end: new Date(c.end_time)
        })))
      }
    }
    loadBookings()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Book a Class</h1>
      <MyCalendar events={events} onSelectEvent={(e) => alert(e.title)} />
    </div>
  )
}
