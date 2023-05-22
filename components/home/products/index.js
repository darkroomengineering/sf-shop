import cn from 'clsx'
import { ScrollableBox } from 'components/scrollable-box'
import { useStore } from 'lib/store'
import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import s from './products.module.scss'

export const Products = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useStore(
    (state) => [state.selectedProduct, state.setSelectedProduct],
    shallow
  )

  useEffect(() => {
    setSelectedProduct(products[0])
  }, [])

  return (
    <section className={s.products}>
      <p className={cn(s.title, 'p text-bold text-uppercase text-muted')}>
        Products
      </p>
      <ScrollableBox className={s.list}>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className={cn(
                selectedProduct?.id === product.id && s.active,
                s['list-item']
              )}
            >
              <button
                onClick={() => {
                  setSelectedProduct(product)
                }}
              >
                <p className="p text-bold text-uppercase">{product.name}</p>
                <p className="p-xs text-uppercase">{product.price}$</p>
              </button>
            </li>
          ))}
        </ul>
      </ScrollableBox>
    </section>
  )
}
