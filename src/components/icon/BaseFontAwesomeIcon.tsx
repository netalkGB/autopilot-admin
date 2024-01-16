import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface BaseFontAwesomeIconProps {
  icon: IconDefinition
  width?: string
  height?: string
  className?: string
}

export interface IconProps {
  width?: string
  height?: string
  className?: string
}

export default function BaseFontAwesomeIcon ({ icon, width = '16px', height = '16px', className }: BaseFontAwesomeIconProps): React.ReactNode {
  return (
    <>
      <FontAwesomeIcon icon={icon} style={{ width, height }} className={className} />
    </>
  )
}
