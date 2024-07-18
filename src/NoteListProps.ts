import { Note } from "./NoteType";
import { Tag } from "./TagType";

export interface NoteListProps {
    notes: Note[]
    availableTags: Tag[]
}