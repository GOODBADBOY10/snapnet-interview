import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search events..."
      className="border px-3 py-2 rounded w-full"
    />
  );
}
