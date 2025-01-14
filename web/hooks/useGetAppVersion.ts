import { useEffect, useState } from 'react'

export default function useGetAppVersion() {
  const [version, setVersion] = useState<string>('')

  useEffect(() => {
    getAppVersion()
  }, [])

  const getAppVersion = () => {
    window.coreAPI?.appVersion().then((version: string | undefined) => {
      setVersion(version ?? '')
    })
  }

  return { version }
}
