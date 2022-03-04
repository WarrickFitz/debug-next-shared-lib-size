import Header from '../components/header'
import { SharedHelpers } from '../components/helpers'

const About = () => (
  <>
    <Header />
    <h1>About page Test 1 {SharedHelpers.toChainEntityName('wozzawozza22')}</h1>
  </>
)

export default About
