export default function useSpeechCreateFlow() {
  const modalRenderKey = ref(0)
  const speeches = useState<Speech[]>('currentSpeeches')
  const speechTags =
    useState<{ id: string; name: string; color: string }[]>('speechTags')
  
  // const selectedTags = new Set()
  const selectedTags = useState('selectedTags', ()=> new Set())
  function handleTagSelect(tag: { tagId: string; selected: boolean }) {

    if (tag.selected) {
      selectedTags.value.add(tag.tagId)
    } else {
      selectedTags.value.delete(tag.tagId)
    }
  }

  async function createNewSpeech(info: { bookId: string, content: string }) {
    const tags = Array.from(selectedTags.value)
    const { bookId, content } = info

    if (!content || !selectedTags.value.size ) {
      return useToast('alert-error', '需有話術內容並選擇至少一個屬性標籤')
    } else if (!bookId) {
      return useToast('alert-error', '需選擇要新增的目的話術本')
    }

    const { data: newSpeech } = await useFetch('/api/speeches', {
      method: 'POST',
      body: {
        bookId,
        tags,
        content
      }
    })

    speeches.value.unshift({
      speech: newSpeech.value
    } as Speech)

    // reset input
    modalRenderKey.value += 1
    selectedTags.value.clear()
  }


  
  return {
    modalRenderKey,
    speechTags,
    selectedTags,
    handleTagSelect,
    createNewSpeech
  }

}