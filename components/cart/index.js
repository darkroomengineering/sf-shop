import { Button, Image } from '@studio-freight/compono'
import cn from 'clsx'
import { useCart } from 'hooks/use-cart'
import useClickOutsideEvent from 'hooks/use-click-outside'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import s from './cart.module.scss'

const Close = dynamic(() => import('assets/svg/close.svg'), { ssr: false })

export const Cart = ({}) => {
  const toggleCart = useStore((state) => state.toggleCart)
  const setToggleCart = useStore((state) => state.setToggleCart)
  const menuRef = useRef(null)

  useClickOutsideEvent(menuRef, () => {
    setToggleCart(false)
  })

  const cart = useCart()
  const data = cart.useFetch()

  return (
    <div className={cn(s.overlay, toggleCart && s.show)}>
      <div className={s.cart} ref={menuRef}>
        <div className={s.inner}>
          <div className={s.header}>
            <button
              className={s.close}
              onClick={() => {
                setToggleCart(false)
              }}
            >
              <Close />
            </button>
            <Button className={cn('button', s['your-bag'])}>Your Bag</Button>
          </div>
          <div className={s['products-wrapper']} data-lenis-prevent>
            <div>
              {data.products.map((product, key) => (
                <div key={`cart-item-${key}`} className={s.products}>
                  <div className={s['product-image']}>
                    <Image src={product.image} alt="" layout="fill" />
                  </div>
                  <div className={s['product-details']}>
                    <div className={s['product-name-price']}>
                      <p>{product.name}</p>
                      <p>${Math.max(product.options.price, 1)}</p>
                    </div>
                    <div className={s['product-editables']}>
                      <div className={s.options}>
                        <ChangeQuantity product={product} />
                        <ChangeSize product={product} />
                      </div>
                      <Button
                        className={cn('button', s.remove)}
                        onClick={() => {
                          cart.utils.removeItemUI(data, {
                            lineIds: [product.id],
                          })
                        }}
                      >
                        REMOVE
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.details}>
            <Button
              className={cn('button', s['check-out'], {
                [s['button-disabled']]: !data.products[0],
              })}
              onClick={cart.utils.triggerCheckoutUI}
              href={data.products[0] ? data?.checkoutUrl : null}
            >
              Checkout
            </Button>
            <div className={s['total-price']}>
              <p className="text-uppercase">total</p>
              <p>${data.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChangeQuantity = ({ product }) => {
  const cart = useCart()

  return (
    <div className={s.quantity}>
      <p className="text-uppercase">QTY</p>
      <aside>
        <button
          onClick={() =>
            cart.utils.updateItemQuantityUI(data, {
              quantity: Math.max(product.quantity - 1, 1),
              id: product.id,
              merchandiseId: product.options.id,
            })
          }
        >
          –
        </button>
        <p>
          {product.quantity < 10 ? `0${product.quantity}` : product.quantity}
        </p>
        <button
          className={cn({
            [s['button-disabled']]:
              product.quantity === product.options.availableQuantity,
          })}
          onClick={() =>
            cart.utils.updateItemQuantityUI(data, {
              quantity: Math.min(
                product.quantity + 1,
                product.options.availableQuantity
              ),
              id: product.id,
              merchandiseId: product.options.id,
            })
          }
        >
          +
        </button>
      </aside>
    </div>
  )
}

const ChangeSize = ({ product }) => {
  return (
    <div className={s.size}>
      <p className="text-uppercase">SIZE</p>
      <aside>
        {product.options.option}
        {/* <SizesDropdown
      product={product}
      variants={product.variants.filter(
        (variant) =>
          variant.id !== product.options.id &&
          variant.options.availableQuantity > 0
      )}
      onChange={(currentProduct, newVariant) => {
        cart.utils.changeSelectedVariantUI(
          data,
          currentProduct,
          newVariant
        )
      }}
    /> */}
      </aside>
    </div>
  )
}
