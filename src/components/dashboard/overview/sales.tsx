'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { recentSalesData } from '@/constants'

export function RecentSales() {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardTitle>Recent Sales</CardTitle>
				<CardDescription>
					Recent customers who made purchases
				</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent className='space-y-4'>
				{recentSalesData.map(user => (
					<div
						key={user.id}
						className='flex items-center justify-between'
					>
						<div className='flex items-center gap-4'>
							<Avatar className='size-8 rounded-full'>
								<img
									className='size-8 rounded-full'
									src={user.image}
									alt={user.name}
								/>
							</Avatar>

							<div className='space-y-1'>
								<p className='text-sm leading-none font-medium'>
									{user.name}
								</p>
								<p className='text-muted-foreground text-sm'>
									{user.email}
								</p>
							</div>
						</div>

						<div className='font-medium'>
							{user.amount}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
