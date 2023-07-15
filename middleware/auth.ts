export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const userInfo = useState<UserInfo>('userInfo')
  if (user.value) {
    // 已經過 supabase 驗證情況下
    if (!userInfo.value) {
      const { data, error } = await useFetch('/api/users', {
        method: 'post',
        body: {
          userId: user.value.id,
          email: user.value.email
        }
      })

      useState('userInfo', () => data.value)
    }
    return
  }
  console.log('🚩 user info not found, redirect to login page')
  return navigateTo('/account/login')
})
