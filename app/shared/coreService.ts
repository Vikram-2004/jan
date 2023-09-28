export type CoreService =
  | DataService
  | ModelService
  | InfereceService
  | ModelManagementService
  | PreferenceService;

export enum DataService {
  GET_CONVERSATIONS = "getConversations",
  CREATE_CONVERSATION = "createConversation",
  DELETE_CONVERSATION = "deleteConversation",
  CREATE_MESSAGE = "createMessage",
  GET_CONVERSATION_MESSAGES = "getConversationMessages",
}

export enum ModelService {
  GET_MODELS = "getModels",
}

export enum InfereceService {
  INFERENCE = "inference",
}

export enum ModelManagementService {
  GET_DOWNLOADED_MODELS = "getDownloadedModels",
  DELETE_MODEL = "deleteModel",
  DOWNLOAD_MODEL = "downloadModel",
  INIT_MODEL = "initModel",
}

export enum PreferenceService {
  GET_EXPERIMENT_COMPONENT = "experimentComponent",
}