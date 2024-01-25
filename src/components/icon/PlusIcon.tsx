import { faPlus } from '@fortawesome/free-solid-svg-icons'
import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'

export default function PlusIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faPlus} width={width} height={height} className={className} />
    </>
  )
}
