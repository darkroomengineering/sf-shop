import cn from 'clsx'
import { ComposableImage } from 'components/composable-image'
import { ScrollableBox } from 'components/scrollable-box'
import { useCart } from 'hooks/use-cart'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useCallback, useRef, useState } from 'react'
import s from './product-details.module.scss'

const Plus = dynamic(() => import('assets/svg/add.svg'), { ssr: false })

export const ProductDetails = () => {
  const cart = useCart()
  const variantsRef = useRef()
  const addToCartRef = useRef()
  const [showInfoModal, setShowInfoModal] = useState(false)
  const setToggleCart = useStore((state) => state.setToggleCart)
  const selectedProduct = useStore((state) => state.selectedProduct)
  const setGalleryVisible = useStore((state) => state.setGalleryVisible)

  const showVariants = useCallback((toggle) => {
    variantsRef.current?.classList.toggle(s.appear, toggle)
  }, [])

  const enableAddToCart = useCallback((toggle) => {
    addToCartRef.current?.classList.toggle(s['button-disabled'], toggle)
  }, [])

  return (
    <section className={s['product-details']}>
      <div className={s.heading}>
        <p className={cn(s.title, 'p text-bold text-uppercase text-muted')}>
          Product detail
        </p>
        <div className={s.actions}>
          <button
            className="p-s decorate"
            onClick={() => {
              setShowInfoModal(!showInfoModal)
              showVariants(false)
              enableAddToCart(!showInfoModal)
            }}
          >
            {showInfoModal ? 'close' : 'info'}
          </button>
          {selectedProduct?.inStock ? (
            <button
              ref={addToCartRef}
              onClick={() => showVariants(true)}
              className={cn('p-s decorate', s['add-to-cart'])}
            >
              Add to cart
            </button>
          ) : (
            <p className={cn('p-s decorate', s['add-to-cart'])}>No Stock</p>
          )}
        </div>
      </div>
      <div className={s['details-content']}>
        <div className={cn(s.images, !showInfoModal && s.visible)}>
          <button
            className={s['modal-trigger']}
            onClick={() => setGalleryVisible(true)}
          >
            <Plus />
          </button>
          <ScrollableBox reset={showInfoModal}>
            <button key={'i'} onClick={() => setGalleryVisible(true)}>
              <ComposableImage sources={selectedProduct.images} />
            </button>
          </ScrollableBox>
        </div>
        <ScrollableBox
          className={cn(s.info, showInfoModal && s.visible)}
          reset={!showInfoModal}
        >
          {selectedProduct.description && (
            <p className={cn(s.description, 'p')}>
              {selectedProduct.description}
            </p>
          )}
          {selectedProduct.price && (
            <div className={s.price}>
              <p
                className={cn(s.title, 'p text-muted text-uppercase text-bold')}
              >
                Price
              </p>
              <p className="p text-uppercase">{selectedProduct.price} $</p>
            </div>
          )}
          {selectedProduct?.variants?.length > 0 && (
            <div className={s.variants}>
              <p
                className={cn(s.title, 'p text-muted text-uppercase text-bold')}
              >
                Sizes
              </p>
              <div className={s.options}>
                {selectedProduct.variants.map((variant, key) => (
                  <div key={`variant-${key}`} className={s.option}>
                    <p>{variant.size}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollableBox>
      </div>
      <div
        className={s['choose-variant']}
        ref={variantsRef}
        onClick={() => showVariants(false)}
      >
        <p className={cn(s.title, 'p text-muted text-uppercase text-bold')}>
          Choose your Fit
        </p>
        {selectedProduct && (
          <div className={s.options}>
            {selectedProduct.variants.map((variant, key) => (
              <button
                key={`variant-${key}`}
                onClick={async () => {
                  await cart.utils.addItemUI({
                    merchandiseId: variant.id,
                    quantity: 1,
                  })
                  setToggleCart(true)
                }}
                className={cn({
                  [s['button-disabled']]: !variant.isAvailable,
                })}
              >
                <p>{variant.size}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
