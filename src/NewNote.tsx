import React from 'react'
import { NewNoteProps } from './newNoteProps'
import { NoteForm } from './NoteForm'

export const NewNote: React.FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm 
            onSubmit={onSubmit}
            onAddTag={onAddTag}
            availableTags={availableTags}
            />
        </>
    )
}