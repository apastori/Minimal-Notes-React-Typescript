import React from 'react'
import { NoteCardProps } from './NoteCardProps'
import { Card, Stack, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NoteList.module.css'

const NoteCard: React.FC<NoteCardProps> = ({ id, title, tags }: NoteCardProps) => {
    return (
        <Card 
        as={Link} 
        to={`/${id}`}
        className={`
            h-100 
            text-reset 
            text-decoration-none
            ${styles.card}
        `}
        >
            <Card.Body>
                <Stack 
                gap={2}
                className='align-items-center justify-content-center h-100'
                >
                    <span className='fs-5'>{title}</span>
                    {
                        tags.length > 0 &&
                        (
                            <Stack 
                            gap={1}
                            className='justify-content-center flex-wrap'
                            >
                                {tags.map((tag) => {
                                    return (
                                        <Badge 
                                        className='text-truncate'
                                        key={tag.id}
                                        >
                                            {tag.label}    
                                        </Badge>
                                    )    
                                })}    
                            </Stack>
                        )
                    } 
                </Stack>
            </Card.Body>
        </Card>
    )
}

export { NoteCard }