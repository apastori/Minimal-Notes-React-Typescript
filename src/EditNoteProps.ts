import { NoteData } from './NoteDataType'
import { Tag } from './TagType'

export interface EditNoteProps {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}