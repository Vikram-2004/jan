import { executeSerial } from '@services/pluginService'
import { InferenceService } from '@janhq/core'
import { useAtom, useSetAtom } from 'jotai'
import { activeAssistantModelAtom, stateModel } from '@helpers/atoms/Model.atom'
import useGetModelById from './useGetModelById'

export default function useStartStopModel() {
  const [activeModel, setActiveModel] = useAtom(activeAssistantModelAtom)
  const { getModelById } = useGetModelById()
  const setStateModel = useSetAtom(stateModel)

  const startModel = async (modelId: string) => {
    if (activeModel && activeModel._id === modelId) {
      console.debug(`Model ${modelId} is already init. Ignore..`)
      return
    }

    setStateModel({ state: 'start', loading: true, model: modelId })

    const model = await getModelById(modelId)

    if (!model) {
      alert(`Model ${modelId} not found! Please re-download the model first.`)
      setStateModel((prev) => ({ ...prev, loading: false }))
      return
    }

    const currentTime = Date.now()
    console.debug('Init model: ', model._id)

    const res = await initModel(model._id)
    if (res?.error) {
      const errorMessage = `Failed to init model: ${res.error}`
      console.error(errorMessage)
      alert(errorMessage)
    } else {
      console.debug(
        `Init model ${modelId} successfully!, take ${
          Date.now() - currentTime
        }ms`
      )
      setActiveModel(model)
    }
    setStateModel((prev) => ({ ...prev, loading: false }))
  }

  const stopModel = async (modelId: string) => {
    setStateModel({ state: 'stop', loading: true, model: modelId })
    setTimeout(async () => {
      await executeSerial(InferenceService.StopModel, modelId)
      setActiveModel(undefined)
      setStateModel({ state: 'stop', loading: false, model: modelId })
    }, 500)
  }

  return { startModel, stopModel }
}

const initModel = async (modelId: string): Promise<any> => {
  return executeSerial(InferenceService.InitModel, modelId)
}
