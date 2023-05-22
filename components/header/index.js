import { useMediaQuery } from '@studio-freight/hamo'
import cn from 'clsx'
// import { ContactForm } from 'components/header/contact-form'
import { Button, Link, Marquee } from '@studio-freight/compono'
import { Cart } from 'components/cart'
import { Separator } from 'components/separator'
import { pad } from 'lib/maths'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import s from './header.module.scss'

const SFDR = dynamic(() => import('icons/sfdr.svg'), { ssr: false })
const Stard = dynamic(() => import('icons/stard.svg'), { ssr: false })
const Monogram = dynamic(() => import('icons/sf-monogram.svg'), { ssr: false })
const StarDuotone = dynamic(() => import('icons/star-duotone.svg'), {
  ssr: false,
})

export const Header = ({ title, principles = [] }) => {
  const setToggleCart = useStore((state) => state.setToggleCart)
  const isMobile = useMediaQuery('(max-width: 800px)')
  // const visible = usePageAppear()

  return (
    <header className={cn(s.container, 'layout-block')}>
      <div className={cn(s.top, 'layout-grid')}>
        <div className={s.eggs}>
          <Link
            name="easter egg"
            className={s.egg}
            href="https://github.com/studio-freight/sf-website"
          >
            <Stard />
          </Link>
          <Link
            name="easter egg - soundboard"
            className={s.egg}
            href="https://soundboard.studiofreight.com"
          >
            <Monogram />
          </Link>
          <Link
            name="darkroom website"
            className={s.egg}
            href="https://darkroom.studiofreight.com"
          >
            <SFDR />
          </Link>
          <Link
            name="easter egg - pale blue dot"
            className={s.egg}
            href="https://youtube.com/watch?v=go5fwsblpt8"
          >
            <StarDuotone />
          </Link>
        </div>
        {isMobile === false && (
          <Marquee className={s.marquee} duration={20}>
            {principles.map((principle, i) => (
              <p key={i} className={cn('p', s.principle)}>
                <span>{pad(i + 1)}</span>
                &nbsp;{principle}
                <span className={s.separator}>{'//'}</span>
              </p>
            ))}
          </Marquee>
        )}
        <Button
          className={cn(s.cta, 'button')}
          onClick={() => {
            setToggleCart(true)
          }}
        >
          View Cart
        </Button>
      </div>
      <Separator />
      <div className={cn(s.header, 'layout-grid')}>
        <h1 className={cn('h1', s.title)}>{title}</h1>
      </div>
      <Separator />

      {isMobile === true && (
        <Marquee className={s.marquee} duration={20}>
          {principles.map((principle, i) => (
            <p key={i} className={cn('p', s.principle)}>
              <span>{pad(i + 1)}</span>
              &nbsp;{principle}
              <span className={s.separator}>{'//'}</span>
            </p>
          ))}
        </Marquee>
      )}
      {/* <ContactForm data={contact} /> */}
      <Cart />
    </header>
  )
}
