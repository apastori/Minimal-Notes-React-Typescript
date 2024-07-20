import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import React, { useMemo } from 'react'
import { AppProps } from './AppProps'
import { NewNote } from './NewNote'
import { RawNote } from './RawNoteType'
import { Tag } from './TagType'
import { useLocalStorage } from './useLocalStorageHook'
import { NoteData } from './NoteDataType'
import { v4 as uuidV4 } from 'uuid'
import { NoteList } from './NotesList'
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'

const App: React.FC<AppProps> = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

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

  function onDeleteNote(id: string): void {
    setNotes(prevNotes => {
      return prevNotes.filter(note => {
        return note.id !== id
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

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {
            ...tag,
            label
          }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string): void {
    setTags(prevTags => {
      return prevTags.filter(tag => {
        return tag.id !== id
      })
    })
  }

  return (
    <Container className='my-4'>
        <Routes>
        <Route path='/' element={
          <NoteList 
          availableTags={tags} 
          notes={notesWithTags}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
          />} 
        />
        <Route path='/new' element={
          <NewNote onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags}
        />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags}/>
        }>
          <Route index element={<Note onDelete={onDeleteNote} />}  />
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
