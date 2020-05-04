import supervisor from './supervisor'
import worker from './worker'

export default function () {
  supervisor.call(this)
  worker.call(this)
}
