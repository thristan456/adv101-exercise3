"use client";

import { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";

interface Note {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (!title.trim()) {
      setIsDuplicate(false);
      return;
    }

    const exists = notes.some(
      (note) =>
        note.title.toLowerCase().trim() === title.toLowerCase().trim() &&
        note.id !== editingId
    );

    setIsDuplicate(exists);
  }, [title, notes, editingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    if (isDuplicate) {
      alert("Cannot submit: A note with this title already exists!");
      return;
    }

    if (editingId) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingId ? { ...note, title, description } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        description,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const inputClasses = `w-full px-5 py-3.5 bg-black/50 border rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition duration-200 backdrop-blur-md ${
    isDuplicate
      ? "border-rose-500 focus:ring-rose-500"
      : "border-white/20 focus:ring-blue-500 focus:border-white/40"
  }`;

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-16 px-5 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
            Note App
          </h1>
        </header>

        <section className="relative rounded-3xl overflow-hidden p-8 md:p-10 shadow-2xl border border-white/20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none"
          >
            <source src="/form-bg.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/65 -z-10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight flex items-center gap-3">
              {editingId ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  Edit Note
                </>
              ) : (
                <>
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Create New Note
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className={inputClasses}
                  required
                />
                
                {isDuplicate && (
                  <p className="mt-2.5 text-sm text-rose-400 font-medium flex items-center gap-1.5">
                    ⚠️ Note title already exists!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter note description..."
                  rows={4}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isDuplicate}
                  className={`px-8 py-3.5 text-white font-semibold rounded-xl transition duration-200 backdrop-blur-md shadow-lg ${
                    isDuplicate
                      ? "bg-neutral-800/80 cursor-not-allowed text-neutral-500 border border-neutral-700"
                      : editingId
                      ? "bg-amber-600 hover:bg-amber-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {editingId ? "Update Note" : "Add Note"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition backdrop-blur-md"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-neutral-800">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Your Notes
            </h2>
            <div className="px-5 py-2 bg-neutral-900 rounded-full border border-neutral-800 text-sm font-medium text-neutral-300">
              {notes.length} Note{notes.length !== 1 ? "s" : ""}
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/60 rounded-3xl border border-dashed border-neutral-800">
              <p className="text-5xl mb-6">📝</p>
              <p className="text-neutral-400 text-xl font-medium">
                No notes created yet.
              </p>
              <p className="text-neutral-500 mt-2">
                Use the form above to add your first note.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}