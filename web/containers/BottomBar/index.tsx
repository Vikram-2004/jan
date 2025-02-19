import React from 'react'
import SystemItem from '@containers/SystemItem'
import useGetSystemResources from '@hooks/useGetSystemResources'
import { useAtomValue } from 'jotai'
import { modelDownloadStateAtom } from '@helpers/atoms/DownloadState.atom'
import { formatDownloadPercentage } from '@utils/converter'
import { activeAssistantModelAtom, stateModel } from '@helpers/atoms/Model.atom'
import useGetAppVersion from '@hooks/useGetAppVersion'
import ProgressBar from '@/_components/ProgressBar'
import { appDownloadProgress } from '@helpers/JotaiWrapper'

const BottomBar = () => {
  const activeModel = useAtomValue(activeAssistantModelAtom)
  const stateModelStartStop = useAtomValue(stateModel)
  const { ram, cpu } = useGetSystemResources()
  const modelDownloadStates = useAtomValue(modelDownloadStateAtom)
  const appVersion = useGetAppVersion()
  const progress = useAtomValue(appDownloadProgress)

  const downloadStates: DownloadState[] = []
  for (const [, value] of Object.entries(modelDownloadStates)) {
    downloadStates.push(value)
  }

  return (
    <div className="fixed bottom-0 left-0 z-20 flex h-8 w-full items-center justify-between border-t border-border bg-background/50 px-4">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center space-x-2">
          {progress && progress >= 0 ? (
            <ProgressBar total={100} used={progress} />
          ) : null}
          {downloadStates.length > 0 && (
            <SystemItem
              name="Downloading"
              value={`${downloadStates[0]
                ?.fileName}: ${formatDownloadPercentage(
                downloadStates[0]?.percent
              )}`}
            />
          )}
        </div>

        {stateModelStartStop.state === 'start' &&
          stateModelStartStop.loading && (
            <SystemItem
              name="Starting:"
              value={stateModelStartStop.model || '-'}
            />
          )}
        {stateModelStartStop.state === 'stop' &&
          stateModelStartStop.loading && (
            <SystemItem
              name="Stopping:"
              value={stateModelStartStop.model || '-'}
            />
          )}
        {!stateModelStartStop.loading && (
          <SystemItem name="Active model:" value={activeModel?.name || '-'} />
        )}
      </div>
      <div className="flex gap-x-2">
        <SystemItem name="CPU:" value={`${cpu}%`} />
        <SystemItem name="Mem:" value={`${ram}%`} />
        <p className="text-xs font-semibold">
          Jan v{appVersion?.version ?? ''}
        </p>
      </div>
    </div>
  )
}

export default BottomBar
