import { Image } from '@studio-freight/compono'
import cn from 'clsx'
import s from './composable-image.module.scss'

export function ComposableImage({
  sources,
  width = 684,
  height = 403,
  large = false,
  small = false,
}) {
  const amount = sources?.length
  return (
    <div className={s.images}>
      {sources?.map((source, id) => (
        <Image
          objectFit="contain"
          key={`composable-image-${id}`}
          src={source.src}
          alt={source.alt || ''}
          width={width / amount}
          height={height}
          className={cn(s.image, large && s.large, small && s.small)}
          style={{ '--height': height, '--width': width / amount }}
        />
      ))}
    </div>
  )
}
