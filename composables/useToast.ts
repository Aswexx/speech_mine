type AlertType = 'alert-success' | 'alert-error' | 'alert-info'

export default function useToast(alertType: AlertType, content: string) {
	const interactPrompts = useState<{
      type: string
      content: string
    }[]>('interactPrompts')

	interactPrompts.value.push({
    type: alertType,
    content
  })

}