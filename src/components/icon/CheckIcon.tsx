import BaseFontAwesomeIcon, { type IconProps } from './BaseFontAwesomeIcon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function CheckIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faCheck} width={width} height={height} className={className} />
    </>
  )
}
