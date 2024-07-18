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
import { NoteList } from './NotesList'
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'

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

  function onUpdateNote(id: string, {tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map(tag => tag.id)
          }
        } else {
          return note
        }
      })
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
        <Route path='/' element={<NoteList availableTags={tags} notes={notesWithTags}/>} />
        <Route path='/new' element={
          <NewNote onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags}
        />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags}/>
        }>
          <Route index element={<Note />}  />
          <Route path='edit' element={
            <EditNote 
            onSubmit={onUpdateNote} 
            onAddTag={addTag} 
            availableTags={tags}
            /> 
          } />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>  
    </Container>
  )
}

export default App
