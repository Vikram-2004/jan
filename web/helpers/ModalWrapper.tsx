'use client'

import BotListModal from '@/_components/BotListModal'
import ConfirmDeleteConversationModal from '@/_components/ConfirmDeleteConversationModal'
import ConfirmDeleteModelModal from '@/_components/ConfirmDeleteModelModal'
import ConfirmSignOutModal from '@/_components/ConfirmSignOutModal'
import MobileMenuPane from '@/_components/MobileMenuPane'
import SwitchingModelConfirmationModal from '@/_components/SwitchingModelConfirmationModal'
import ModalNoActiveModel from '@/_components/ModalNoActiveModel'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ModalWrapper: React.FC<Props> = ({ children }) => (
  <>
    <MobileMenuPane />
    <ConfirmDeleteConversationModal />
    <ConfirmSignOutModal />
    <ConfirmDeleteModelModal />
    <BotListModal />
    <SwitchingModelConfirmationModal />
    <ModalNoActiveModel />
    {children}
  </>
)
