export {}

declare global {
  interface Book {
    id: string
    name: string
    description: string
    color: string
  }

  interface Speech {
    speech: {
      id: string
      content: string
      marking: {
        tag: {
          id: string
          name: string
          color: string
        }
      }[],
    }
  }

  interface UserInfo {
    id: string,
    name: string,
    email: string,
    createdAt: string
  }
}
