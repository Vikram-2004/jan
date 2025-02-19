export const toGigabytes = (input: number) => {
  if (input > 1024 ** 3) {
    return (input / 1000 ** 3).toFixed(2) + 'GB'
  } else if (input > 1024 ** 2) {
    return (input / 1000 ** 2).toFixed(2) + 'MB'
  } else if (input > 1024) {
    return (input / 1000).toFixed(2) + 'KB'
  } else {
    return input + 'B'
  }
}

export const formatDownloadPercentage = (input: number) => {
  return (input * 100).toFixed(2) + '%'
}

export const formatDownloadSpeed = (input: number | undefined) => {
  if (!input) return '0B/s'
  return toGigabytes(input) + '/s'
}

export const formatTwoDigits = (input: number) => {
  // convert input from string to number
  input = Number(input)

  return input.toFixed(2)
}

export const formatPluginsName = (input: string) => {
  return input.replace('@janhq/', '').replaceAll('-', ' ')
}
