import React from "react"
import { EditTagsModalProps } from "./EditTagsModalProps"
import { Modal, Stack, Row, Col, Button, Form } from "react-bootstrap"

export const EditTagsModal: React.FC<EditTagsModalProps> = ({ show, availableTags, handleClose, onUpdateTag, onDeleteTag }: EditTagsModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                    {
                        availableTags.map(tag => {
                            return (
                                <Row key={tag.id}>
                                    <Col >
                                        <Form.Control
                                        type='text'
                                        value={tag.label}
                                        onChange={e => {
                                            onUpdateTag(tag.id, e.target.value)
                                        }}
                                        />
                                    </Col>
                                    <Col xs='auto'>
                                        <Button 
                                        variant='outline-danger'
                                        onClick={() => onDeleteTag}
                                        >
                                        &times;
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}