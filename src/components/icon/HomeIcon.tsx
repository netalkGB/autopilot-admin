import { faHouse } from '@fortawesome/free-solid-svg-icons'
import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'

export default function HomeIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faHouse} width={width} height={height} className={className} />
    </>
  )
}
