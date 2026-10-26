import { listingPage } from '@/server/listing'

const { generateMetadata, ListingPage } = listingPage('projetos')

export { generateMetadata }
export default ListingPage
