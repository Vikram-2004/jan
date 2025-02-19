'use client'
import {
  extensionPoints,
  plugins,
} from '@plugin'
import {
  CoreService,
  InferenceService,
  ModelManagementService,
  StoreService,
} from '@janhq/core'

export const isCorePluginInstalled = () => {
  if (!extensionPoints.get(StoreService.CreateCollection)) {
    return false
  }
  if (!extensionPoints.get(InferenceService.InitModel)) {
    return false
  }
  if (!extensionPoints.get(ModelManagementService.DownloadModel)) {
    return false
  }
  return true
}
export const setupBasePlugins = async () => {
  if (
    typeof window === 'undefined' ||
    typeof window.electronAPI === 'undefined'
  ) {
    return
  }
  const basePlugins = await window.electronAPI.basePlugins()

  if (
    !extensionPoints.get(StoreService.CreateCollection) ||
    !extensionPoints.get(InferenceService.InitModel) ||
    !extensionPoints.get(ModelManagementService.DownloadModel)
  ) {
    const installed = await plugins.install(basePlugins)
    if (installed) {
      window.location.reload()
    }
  }
}

export const execute = (name: CoreService, args?: any) => {
  if (!extensionPoints.get(name)) {
    // alert('Missing extension for function: ' + name)
    return undefined
  }
  return extensionPoints.execute(name, args)
}

export const executeSerial = (name: CoreService, args?: any) => {
  if (!extensionPoints.get(name)) {
    // alert('Missing extension for function: ' + name)
    return Promise.resolve(undefined)
  }
  return extensionPoints.executeSerial(name, args)
}
