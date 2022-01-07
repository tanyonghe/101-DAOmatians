import { useRouter } from 'next/router'

const Proposal = () => {
  const router = useRouter()
  const { space, proposal } = router.query

  return (
    <div>
      <p>Space: {space}</p>
      <p>Proposal: {proposal}</p>
    </div>
  )
}

export default Proposal