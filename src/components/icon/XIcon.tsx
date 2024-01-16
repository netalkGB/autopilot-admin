import BaseFontAwesomeIcon, { type IconProps } from './BaseFontAwesomeIcon'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function XIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faXmark} width={width} height={height} className={className} />
    </>
  )
}
