import { useMediaQuery } from '@studio-freight/hamo'
import cn from 'clsx'
import { About } from 'components/home/about'
import { Products } from 'components/home/products'
import { ProductDetails } from 'components/home/products-details'
import { ClientOnly } from 'components/isomorphic'
import { LayoutMobile } from 'components/layout-mobile'
import { fetchCmsQuery } from 'contentful/api'
import {
  footerEntryQuery,
  studioFreightEntryQuery,
} from 'contentful/queries/home.graphql'
import { Layout } from 'layouts/default'
import Shopify from 'lib/shopify'
import dynamic from 'next/dynamic'
import s from './home.module.scss'

const Gallery = dynamic(
  () => import('components/gallery').then(({ Gallery }) => Gallery),
  {
    ssr: false,
  }
)

export default function Home({ studioFreight, footer, productsArray }) {
  const isDesktop = useMediaQuery('(min-width: 800px)')

  console.log('home render')

  return (
    <Layout
      theme="dark"
      principles={studioFreight.principles}
      studioInfo={{
        phone: studioFreight.phoneNumber,
        email: studioFreight.email,
      }}
      footerLinks={footer.linksCollection.items}
    >
      {!isDesktop ? (
        <LayoutMobile studioFreight={studioFreight} products={productsArray} />
      ) : (
        <ClientOnly>
          <div className={cn(s.content, 'layout-grid')}>
            <About data={studioFreight.about} />
            <Products products={productsArray} />
            <ProductDetails />
          </div>
        </ClientOnly>
      )}
      <Gallery />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const [{ studioFreight }, { footer }] = await Promise.all([
    fetchCmsQuery(studioFreightEntryQuery, {
      preview,
    }),
    fetchCmsQuery(footerEntryQuery, {
      preview,
    }),
  ])

  const store = new Shopify()
  const productsArray = await store.getAllProducts()

  return {
    props: {
      studioFreight,
      footer,
      productsArray,
      id: 'home',
    },
    revalidate: 30,
  }
}
