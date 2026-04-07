import { Heading } from '@/components/shared/heading'
import PageContainer from '@/components/shared/page-container'
import { Separator } from '@/components/ui/separator'

import { ProductsTable } from './product-table/table'
import { productsData } from '@/constants'

export function ProductList() {
	return (
		<PageContainer scrollable>
			<div className='flex flex-1 flex-col space-y-4'>
				<div className='flex items-start justify-between'>
					<Heading
						title='Products'
						description='Manage product (server-side table functionality).'
					/>
				</div>

				<Separator />

				<ProductsTable data={productsData} />
			</div>
		</PageContainer>
	)
}
