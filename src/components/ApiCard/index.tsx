import { convertSecondsToTime } from "../../utils/convertSecondsToTime"
import './styles.css'

export type Api = {
  name: string
  success: boolean
  message: string
  hostname: string
  time: number
}

export function ApiCard({ name, hostname, message, success, time }: Api) {

  return (
    <div className="api-card-container">
      <h3>{name}</h3>
      <p className="status" style={{ backgroundColor: success ? 'green' : 'red' }}>{success ? 'Healthy' : 'Error'}</p>
      {
        success ? (
          <>
            <p>{hostname}</p>
            <p>{convertSecondsToTime(time)}</p>
          </>
        ) : (
          <>
            <p className="error">OUTAGE</p>
            <p>{message}</p>
          </>
        )
      }
    </div>
  )
}