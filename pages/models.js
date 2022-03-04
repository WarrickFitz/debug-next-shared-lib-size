import Header from '../components/header'
import { Models as HelperModels } from '../components/cryptoHelpers'

function test() {
  console.log('test : ' + HelperModels.AsymEncryptionSchemesForOreId.DefaultSecp256K1)
  console.log(HelperModels.AsymEncryptionSchemesForOreId.DefaultSecp256K1)
}

const Models = () => (
  <>
    <Header />
    <h1>ModelsTest 1 {HelperModels.AsymEncryptionSchemesForOreId.DefaultSecp256K1} </h1>
    <button onClick={test}>Run Test</button>
  </>
)

export default Models
