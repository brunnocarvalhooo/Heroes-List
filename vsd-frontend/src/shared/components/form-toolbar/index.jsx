import { FiSave } from 'react-icons/fi'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'

import { Button } from '../form/button'

import {
  ToolbarContainer,
  ActionButtonContainer,
  EndButtonContainer,
} from './styles'

export const FormToolbar = ({
  handleSave,
  handleBack,
  handleNew,
  showNew = false,
  showSave = false,
}) => {
  return (
    <ToolbarContainer>
      <ActionButtonContainer>
        <Button title="Voltar" onClick={handleBack}>
          <IoMdArrowBack size={24} />
        </Button>
      </ActionButtonContainer>

      <EndButtonContainer>
        {showSave && (
          <Button title="Salvar" onClick={handleSave}>
            <FiSave size={24} />
          </Button>
        )}

        {showNew && (
          <Button title="Criar" onClick={handleNew}>
            <AiOutlinePlus size={24} />
          </Button>
        )}
      </EndButtonContainer>
    </ToolbarContainer>
  )
}
