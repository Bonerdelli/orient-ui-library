import commonEN from './common/en.yaml'
import commonRU from './common/ru.yaml'
import modelsEN from './models/en.yaml'
import modelsRU from './models/ru.yaml'

export const i18nCommon = {
  en: {
    common: commonEN,
    models: modelsEN,
  },
  ru: {
    common: commonRU,
    models: modelsRU,
  },
} as const
