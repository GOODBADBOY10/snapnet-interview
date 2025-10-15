import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { useEventsData } from "../api/eventsApi";
import type { Event } from "../api/eventsApi";

const ITEMS_PER_PAGE = 6;


export default function EventsPage() {
  const { data: events = [], isLoading, isError } = useEventsData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [petsAllowedOnly, setPetsAllowedOnly] = useState(false);

  // 🔍 Filter events by search + pets allowed
  const filtered = events.filter(
    (e: Event) =>
      e.title.toLowerCase().includes(search.toLowerCase()) &&
      (!petsAllowedOnly || e.petsAllowed)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // ✂️ Slice results for pagination
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading events.</p>;

  return (
    <div className="space-y-4">
      {/* 🔎 Search + Filter Section */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={petsAllowedOnly}
            onChange={() => setPetsAllowedOnly(!petsAllowedOnly)}
          />
          Pets Allowed
        </label>
      </div>

      {/* 🎟️ Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginated.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}