import { Note } from "./NoteType"
import { useOutletContext } from "react-router-dom"

export function useNote(): Note {
    return useOutletContext<Note>()
}