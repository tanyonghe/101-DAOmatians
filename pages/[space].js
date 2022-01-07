import { useRouter } from 'next/router'

const Space = () => {
  const router = useRouter()
  const { space } = router.query

  return <p>Space: {space}</p>
}

export default Space