let timer: NodeJS.Timeout

export default async function useReqDebounce(reqFunc: () => Promise<any>) {
  const isLoading = useState('isLoading', () => false)
  isLoading.value = true
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(async () => {
    await reqFunc()
    isLoading.value = false
  }, 2000)
}
