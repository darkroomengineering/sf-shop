import * as Accordion from '@radix-ui/react-accordion'
import { Link } from '@studio-freight/compono'
import cn from 'clsx'
import { ComposableImage } from 'components/composable-image'
import Slider from 'components/slider'
import { useCart } from 'hooks/use-cart'
import { slugify } from 'lib/slugify'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import s from './project-accordion.module.scss'

const Arrow = dynamic(() => import('icons/arrow.svg'), { ssr: false })

export const ProjectAccordion = ({ data }) => {
  const [active, setActive] = useState(0)
  const setToggleCart = useStore((state) => state.setToggleCart)
  const cart = useCart()
  const [selectedVariant, setSelectedVariant] = useState({
    availableQuantity: 1000,
  })

  return (
    <div className={s.accordion}>
      <p className="p text-bold text-uppercase text-muted">Products</p>

      <Accordion.Root type="single" className={s['accordion-root']} collapsible>
        {data.map((item, i) => (
          <Accordion.Item value={slugify(item.name)} key={i} className={s.item}>
            <Accordion.Header asChild>
              <Accordion.Trigger
                onClick={() => {
                  setActive(active === i ? false : i)
                }}
                className={s.trigger}
              >
                <p>{item.name}</p>
                <span className="p-s">{item.price}$</span>
                <svg
                  className={s.icon}
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 1H1V11" stroke="var(--green)" />
                  <path d="M15 1H25V11" stroke="var(--green)" />
                  <path d="M15 25L25 25L25 15" stroke="var(--green)" />
                  <path d="M11 25L1 25L1 15" stroke="var(--green)" />
                  <g className={s.x}>
                    <path
                      d="M8.75684 8.75745L17.2421 17.2427"
                      stroke="var(--green)"
                    />
                    <path
                      d="M17.2422 8.75745L8.75691 17.2427"
                      stroke="var(--green)"
                    />
                  </g>
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={s['accordion-content']}>
              <Slider enableAutoplay={!!active} className={s.slides}>
                {/* {item.images.map((asset, i) => ( */}

                <ComposableImage
                  sources={item.images}
                  key={i}
                  width={343}
                  height={211}
                  small
                />

                {/* ))} */}
              </Slider>
              {item?.link && (
                <Link href={item?.link} className={cn('p-s', s.external)}>
                  site
                  <Arrow className={s.arrow} />
                </Link>
              )}
              {item.description && (
                <p className={cn(s.description, 'p')}>{item.description}</p>
              )}
              {item.testimonial && (
                <div className={s.testimonial}>
                  <p
                    className={cn(
                      s.title,
                      'p text-muted text-uppercase text-bold'
                    )}
                  >
                    Testimonial
                  </p>
                  <p className="p">{item.testimonial}</p>
                </div>
              )}

              {item?.variants?.length > 0 && (
                <div className={s.variants}>
                  <p
                    className={cn(
                      s.title,
                      'p text-muted text-uppercase text-bold'
                    )}
                  >
                    Sizes
                  </p>
                  <div className={s.options}>
                    {item.variants.map((variant, key) => (
                      <button
                        key={`variant-${key}`}
                        onClick={() => {
                          setSelectedVariant(variant)
                        }}
                        className={cn({
                          [s['selected-option']]:
                            selectedVariant &&
                            selectedVariant.size === variant.size,
                          [s['button-disabled']]: !variant.isAvailable,
                        })}
                      >
                        <p>{variant.size}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={s.actions}>
                {item?.inStock ? (
                  <button
                    onClick={async () => {
                      await cart.utils.addItemUI({
                        merchandiseId: selectedVariant.id,
                        quantity: 1,
                      })
                      setToggleCart(true)
                    }}
                    className={cn(
                      'p-s decorate',
                      s['add-to-cart'],
                      selectedVariant.size === undefined && s['button-disabled']
                    )}
                  >
                    Add to cart
                  </button>
                ) : (
                  <p className={cn('p-s decorate', s['add-to-cart'])}>
                    No Stock
                  </p>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
