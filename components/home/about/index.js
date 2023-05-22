import cn from 'clsx'
import { ScrollableBox } from 'components/scrollable-box'
import { renderer } from 'contentful/renderer'
import s from './about.module.scss'

export const About = ({ data }) => {
  return (
    <section className={s.about}>
      <p className={cn(s.title, 'p text-bold text-uppercase text-muted')}>
        About
      </p>
      <ScrollableBox className={s.description}>{renderer(data)}</ScrollableBox>
    </section>
  )
}
