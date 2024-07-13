import { NoteData } from "./NoteDataType";
import { Tag } from "./TagType";

export interface NewNoteProps {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}