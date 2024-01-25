import { faRss } from '@fortawesome/free-solid-svg-icons'
import BaseFontAwesomeIcon, { type IconProps } from '@/components/icon/BaseFontAwesomeIcon'

export default function RssIcon ({ width, height, className }: IconProps): React.ReactNode {
  return (
    <>
      <BaseFontAwesomeIcon icon={faRss} width={width} height={height} className={className} />
    </>
  )
}
