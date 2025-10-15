import { useParams, Link } from "react-router-dom";
import { useEventsData } from "../api/eventsApi";
import type { Event } from "../api/eventsApi";
import { ArrowLeftIcon } from "lucide-react";


export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: events = [] } = useEventsData();

  const event = events.find((e: Event) => String(e.id) === id);

  if (!event) {
    return <p className="text-center text-gray-500 mt-10">Event not found</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-3">{event.date}</p>
      <p className="text-gray-800 leading-relaxed">{event.description}</p>

      {event.petsAllowed && (
        <p className="mt-3 text-green-600 font-medium flex items-center gap-2">
          Pets Allowed
        </p>
      )}

      <Link
        to="/"
        className="inline-block mt-6 text-blue-600 hover:underline font-medium"
      >
        <ArrowLeftIcon /> Back to events
      </Link>
    </div>
  );
}