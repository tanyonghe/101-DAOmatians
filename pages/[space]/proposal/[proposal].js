import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

const DynamicVotesChart = dynamic(() =>
  import('../../../components/VotesChart').then((mod) => mod.VotesChart)
)


const Proposal = () => {
  const router = useRouter()
  const { space, proposal } = router.query

  return (
    <div>
      <DynamicVotesChart />
      <p>Space: {space}</p>
      <p>Proposal: {proposal}</p>
    </div>
  )
}

export default Proposal