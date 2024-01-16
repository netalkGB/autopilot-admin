import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'

export default function HistoryIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faClockRotateLeft} width={width} height={height} className={className} />
    </>
  )
}
