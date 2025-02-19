import { activeBotAtom } from '@helpers/atoms/Bot.atom'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import Avatar from '../Avatar'
import PrimaryButton from '../PrimaryButton'
import useCreateConversation from '@hooks/useCreateConversation'
import useDeleteBot from '@hooks/useDeleteBot'
import {
  setMainViewStateAtom,
  MainViewState,
} from '@helpers/atoms/MainView.atom'

const BotInfoContainer: React.FC = () => {
  const activeBot = useAtomValue(activeBotAtom)
  const setMainView = useSetAtom(setMainViewStateAtom)
  const { deleteBot } = useDeleteBot()
  const { createConvoByBot } = useCreateConversation()

  const onNewChatClicked = () => {
    if (!activeBot) {
      alert('No bot selected')
      return
    }

    createConvoByBot(activeBot)
  }

  const onDeleteBotClick = async () => {
    if (!activeBot) {
      alert('No bot selected')
      return
    }

    // TODO: display confirmation diaglog
    const result = await deleteBot(activeBot._id)
    if (result === 'success') {
      setMainView(MainViewState.Welcome)
    }
  }

  if (!activeBot) return null

  return (
    <div className="flex h-full w-full pt-4">
      <div className="mx-auto flex w-[672px] min-w-max flex-col gap-4">
        <Avatar />
        <h1 className="text-center text-2xl font-bold">{activeBot?.name}</h1>
        <div className="flex gap-4">
          <PrimaryButton
            fullWidth
            title="New chat"
            onClick={onNewChatClicked}
          />
          <PrimaryButton
            fullWidth
            className="bg-red-500 hover:bg-red-400"
            title="Delete bot"
            onClick={onDeleteBotClick}
          />
        </div>
        <p>{activeBot?.description}</p>
        <p>System prompt</p>
        <p>{activeBot?.systemPrompt}</p>
      </div>
    </div>
  )
}

export default BotInfoContainer
