import { listingPage } from '@/server/listing'

const { generateMetadata, ListingPage } = listingPage('noticias')

export { generateMetadata }
export default ListingPage
