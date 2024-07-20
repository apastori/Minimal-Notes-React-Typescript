import { Tag } from './TagType'

export interface EditTagsModalProps {
    show: boolean,
    availableTags: Tag[],
    handleClose: () => void,
    onUpdateTag: (id: string, label: string) => void,
    onDeleteTag: (id: string) => void
}