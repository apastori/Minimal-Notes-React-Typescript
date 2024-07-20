import React from 'react'
import { EditNoteProps } from './EditNoteProps'
import { NoteForm } from './NoteForm'
import { Note } from './Note'
import { useNote } from './useNote'

export const EditNote: React.FC<EditNoteProps> = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    const note: Note = useNote()
    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
            title={note.title}
            markdown={note.markdown}
            tags={note.tags}
            onSubmit={data => onSubmit(note.id, data)}
            onAddTag={onAddTag}
            availableTags={availableTags}
            />
        </>
    )
}