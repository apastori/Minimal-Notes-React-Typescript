import React from 'react'
import { NoteLayoutProps } from './NoteLayoutProps'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './NoteType'

const NoteLayout: React.FC<NoteLayoutProps> = ({ notes }: NoteLayoutProps) => {
    const { id } = useParams()
    const note: Note = notes.find(n => n.id === id)!
    if (note == null) return <Navigate to='/' replace />
    return (
        <Outlet context={note} />
    )
}

export { NoteLayout }