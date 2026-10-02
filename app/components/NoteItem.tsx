import React from "react";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-7 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.02] hover:border-white/40">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none"
      >
        <source src="/note-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/65 -z-10 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight drop-shadow">
          {note.title}
        </h3>
        <p className="text-neutral-200 whitespace-pre-line leading-relaxed text-base drop-shadow-sm">
          {note.description}
        </p>
      </div>

      <div className="relative z-10 mt-7 flex justify-end gap-3 border-t border-white/15 pt-4">
        <button
          onClick={() => onEdit(note)}
          className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold text-sm transition backdrop-blur-md shadow-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-5 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl font-semibold text-sm transition backdrop-blur-md shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}