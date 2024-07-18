import React from "react"
import type { Note } from "./NoteType"
import { useNote } from "./useNote"
import { NoteProps } from "./NoteProps"
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const Note: React.FC<NoteProps> = () => {
    const note: Note = useNote();
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                        gap={1}
                        direction='horizontal'
                        className='justify-content-center flex-wrap'
                        >
                            {
                                note.tags.map((tag) => {
                                    return (
                                        <Badge
                                        className="text-truncate"
                                        key={tag.id}
                                        >
                                            {tag.label}
                                        </Badge>
                                    )
                                })
                            }
                        </Stack>
                    )}
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary'>Edit</Button>
                        </Link>
                        <Button variant="outline-danger">Delete</Button>
                        <Link to='/'>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>
                {note.markdown}        
            </ReactMarkdown>
        </>
    )
}

export { Note }