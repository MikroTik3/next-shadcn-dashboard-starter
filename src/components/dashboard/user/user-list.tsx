import { Heading } from '@/components/shared/heading'
import PageContainer from '@/components/shared/page-container'
import { Separator } from '@/components/ui/separator'

import { UsersTable } from './user-table/table'
import { usersData } from '@/constants'

export function UserList() {
	return (
		<PageContainer scrollable>
			<div className='flex flex-1 flex-col space-y-4'>
				<div className='flex items-start justify-between'>
					<Heading
						title='Users'
						description='Manage user (server-side table functionality).'
					/>
				</div>

				<Separator />

				<UsersTable data={usersData} />
			</div>
		</PageContainer>
	)
}
