import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes } from "react-router-dom"
import { Container } from 'react-bootstrap'
import React, { useMemo } from 'react'
import { AppProps } from './AppProps'
import { NewNote } from "./NewNote"
import { RawNote } from './RawNoteType'
import { Tag } from './TagType'
import { useLocalStorage } from './useLocalStorageHook'
import { NoteData } from './NoteDataType'
import { v4 as uuidV4 } from 'uuid';

const App: React.FC<AppProps> = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => {
          note.tagIds.includes(tag.id)
        })
      }
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData): void {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map(tag => tag.id)
        }
      ]
    })
  }

  function addTag(tag: Tag): void {
    setTags(prevTags => {
      return [
        ...prevTags,
        tag
      ]
    })
  }

  return (
    <Container className='my-4'>
        <Routes>
        <Route path='/' element={<h1>Hi</h1>} />
        <Route path='/new' element={
          <NewNote onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags}
        />} />
        <Route path='/:id'>
          <Route index element={<h1>Show</h1>}  />
          <Route path='edit' element={<h1>Edit</h1>}  />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>  
    </Container>
  )
}

export default App
