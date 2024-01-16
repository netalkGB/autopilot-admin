import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function LogoutIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faArrowRightFromBracket} width={width} height={height} className={className} />
    </>
  )
}
