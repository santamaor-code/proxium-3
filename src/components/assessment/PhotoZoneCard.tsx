"use client";

import { useRef } from "react";

interface PhotoZoneCardProps {
  label: string;
  previewUrl: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
}

export function PhotoZoneCard({
  label,
  previewUrl,
  onSelect,
  onRemove,
}: PhotoZoneCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
  }

  if (previewUrl) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-card border border-charcoal/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={label}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-charcoal/60 px-3 py-2">
          <span className="text-xs text-stone-50">{label}</span>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-stone-50 underline"
          >
            Quitar
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-card border border-dashed border-charcoal/25 bg-stone-50 text-center text-sm text-charcoal-soft transition-colors hover:border-sage-400 hover:text-sage-700"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="14" r="3.5" />
      </svg>
      {label}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </button>
  );
}
