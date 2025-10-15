import { Link } from "react-router-dom";
import type { Event } from "../api/eventsApi";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="block bg-white p-4 rounded shadow hover:shadow-lg transition"
    >
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-gray-500">{event.date}</p>
      {event.petsAllowed && (
        <p className="text-green-600 mt-1">🐾 Pets Allowed</p>
      )}
    </Link>
  );
}