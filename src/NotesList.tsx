import React, { useMemo, useState } from 'react'
import { NoteListProps } from './NoteListProps'
import { Row, Col, Stack, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Tag } from './TagType'
import { NoteCard } from './NoteCard'
import { Note } from './Note'
import { Note as NoteT } from './NoteType'
import { EditTagsModal } from './EditTagsModal'

export const NoteList: React.FC<NoteListProps> = ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState<boolean>(false)
    const filteredNotes: Note[] = useMemo(() => {
        return notes.filter((note: NoteT): boolean => {
            return (
                title === '' || 
                note.title.toLowerCase().includes(title.toLowerCase())
            ) &&
            (
                selectedTags.length === 0 ||
                selectedTags.every((tag: Tag) => {
                    note.tags.some((noteTag: Tag): boolean => {
                        return noteTag.id === tag.id
                    })
                })
            )
        })
    }, [title, selectedTags, notes])
    return (
        <>
            <Row className="align-items-center mb-4" >
                <Col >
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto' >
                    <Stack
                    gap={2}
                    direction='horizontal'
                    >
                        <Link to='/new' >
                            <Button variant='primary'>
                                Create
                            </Button>
                        </Link>
                        <Button
                        onClick={() => setEditTagsModalIsOpen(true)}
                        variant='outline-secondary'
                        >
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control 
                            type='text' 
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect 
                            value={selectedTags.map((tag: Tag) => {
                            return  {label: tag.label, value: tag.id}
                            })}
                            options={availableTags.map((tag: Tag) => {
                            return {
                                label: tag.label,
                                value: tag.id
                            }
                            })}
                            onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value }   
                                })
                            )
                            }}
                            isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row 
            xs={1} 
            sm={2} 
            lg={3} 
            xl={4} 
            className="g-3" >
                {
                    filteredNotes.map((note: Note) => {
                        return (
                            <Col key={note.id}>
                                <NoteCard 
                                id={note.id}  
                                title={note.title}
                                tags={note.tags}
                                />
                            </Col>
                        )
                    })
                }        
            </Row>
            <EditTagsModal 
            show={editTagsModalIsOpen}
            handleClose={() => setEditTagsModalIsOpen}
            availableTags={availableTags}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
            />
        </>
    )
}

