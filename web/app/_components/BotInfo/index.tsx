import { activeBotAtom } from '@helpers/atoms/Bot.atom'
import {
  MainViewState,
  setMainViewStateAtom,
} from '@helpers/atoms/MainView.atom'
import useCreateConversation from '@hooks/useCreateConversation'
import useDeleteBot from '@hooks/useDeleteBot'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import ExpandableHeader from '../ExpandableHeader'

const BotInfo: React.FC = () => {
  const { deleteBot } = useDeleteBot()
  const { createConvoByBot } = useCreateConversation()
  const setMainView = useSetAtom(setMainViewStateAtom)
  const botInfo = useAtomValue(activeBotAtom)
  if (!botInfo) return null

  const onNewChatClicked = () => {
    if (!botInfo) {
      alert('No bot selected')
      return
    }

    createConvoByBot(botInfo)
  }

  const onDeleteBotClick = async () => {
    // TODO: display confirmation diaglog
    const result = await deleteBot(botInfo._id)
    if (result === 'success') {
      setMainView(MainViewState.Welcome)
    }
  }

  return (
    <div className="mx-1 my-1 flex flex-col gap-2">
      <ExpandableHeader title="BOT INFO" />

      <div className="flex flex-col">
        <label className="mb-2">{botInfo.name}</label>
        <span className="text-muted-foreground">{botInfo.description}</span>
      </div>

      <div className="flex w-full flex-col space-y-2">
        <PrimaryButton onClick={onNewChatClicked} title="New chat" />
        <PrimaryButton
          title="Delete bot"
          onClick={onDeleteBotClick}
          className="bg-red-500 hover:bg-red-400"
        />
      </div>
    </div>
  )
}

export default BotInfo
