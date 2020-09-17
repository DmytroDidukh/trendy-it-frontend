import React, {useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalBasic = ({msg, item, setAction}) => {
    const [open, setOpen] = useState(false)

    const handleButtonClick = (e) => {
        setOpen(false)
        e.target.name === 'confirm' && setAction(item)
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Icon name='trash alternate outline'/>}
            className='remove-modal'
        >
            <Header icon>
                <Icon name='trash' />
                Дісйно видалити "{item.name}" з {msg}
            </Header>

            <Modal.Actions>
                <Button color='green' name='cancel' inverted onClick={handleButtonClick}>
                    Скасувати
                </Button>
                <Button basic color='red' inverted name='confirm' onClick={handleButtonClick}>
                    <Icon name='remove' /> Видалити
                </Button>
            </Modal.Actions>
        </Modal>
    )
}


export default ModalBasic
