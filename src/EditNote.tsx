import React from 'react'
import { EditNoteProps } from './EditNoteProps'
import { NoteForm } from './NoteForm'

export const EditNote: React.FC<EditNoteProps> = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm 
            onSubmit={onSubmit}
            onAddTag={onAddTag}
            availableTags={availableTags}
            />
        </>
    )
}