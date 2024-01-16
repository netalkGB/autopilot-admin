import BaseFontAwesomeIcon, { type IconProps } from './BaseFontAwesomeIcon'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

export default function RotateIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faRotate} width={width} height={height} className={className} />
    </>
  )
}
