import { useQuery } from "@tanstack/react-query";
import mockEvents from "../mockEvents";

const API_URL =
  "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

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

export const useEventsData = () =>
  useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });
