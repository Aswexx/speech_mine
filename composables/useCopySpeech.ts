export default async function useCopySpeech(content: string) {
  await navigator.clipboard.writeText(content)
  useToast('alert-success', '已複製內容')
}