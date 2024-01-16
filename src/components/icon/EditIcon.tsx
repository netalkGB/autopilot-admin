import BaseFontAwesomeIcon, { type IconProps } from './BaseFontAwesomeIcon'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export default function EditIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faPencil} width={width} height={height} className={className} />
    </>
  )
}
