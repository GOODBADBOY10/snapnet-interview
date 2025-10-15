// // const API_URL = "https://api.example.com/events"; // replace with your real endpoint
// const API_URL = "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events"; // replace with your real endpoint

import { useQuery } from "@tanstack/react-query";
import mockEvents from "../mockEvents";

// ✅ Use your real endpoint here
const API_URL =
  "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

// ✅ Define the Event type structure
export interface Event {
  id: string | number;
  title: string;
  description: string;
  date: string;
  location?: string;
  petsAllowed?: boolean;
  category?: string;
  image?: string;
  capacity?: number;
  time?: string;
  organizer?: string;
}

// ✅ Fetcher function with error handling and fallback
const fetchEvents = async (): Promise<Event[]> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn("⚠️ Using mock data due to error:", err);
    return mockEvents;
  }
};

// ✅ React Query hook to use in your components
export const useEventsData = () =>
  useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
