import { NoteData } from "./NoteDataType"
import { Tag } from "./TagType"

interface NewNoteProps {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export type { NewNoteProps }