import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function DownIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faAngleDown} width={width} height={height} className={className} />
    </>
  )
}
