import { listingPage } from '@/server/listing'

const { generateMetadata, ListingPage } = listingPage('atuacao')

export { generateMetadata }
export default ListingPage
