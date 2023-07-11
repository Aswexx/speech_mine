export default function useBooks() {
  const books = useState<any>('books', () => [])
  const speechTags = useState<any>('speechTags', () => [])

  const currentSpeeches = useState<any>('currentSpeeches', () => [])

  async function getBooksByUserId(userId: string | undefined) {
    if (!userId) return
    const { data, error } = await useFetch(`/api/books`, {
      method: 'get',
      params: { userId }
    })
    books.value = data
  }

  async function getSpeechTags() {
    const { data, error } = await useFetch(`/api/tags`)
    speechTags.value = data
  }

  async function getSpeechesByBook(bookId: string) {
    const { data, error } = await useFetch<Speech[]>(
      '/api/speeches',
      {
        query: { bookId }
      }
    )
    currentSpeeches.value = data
  }

  return {
    books,
    getBooksByUserId,
    getSpeechTags,
    currentSpeeches,
    getSpeechesByBook
  }
}


