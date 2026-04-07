'use client'

import { IconTrendingUp } from '@tabler/icons-react'
import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

type DevicesData = {
	month: string
	desktop: number
	mobile: number
}

const chartConfig = {
	visitors: { label: 'Visitors' },
	desktop: { label: 'Computer', color: 'var(--primary)' },
	mobile: { label: 'Mobile', color: 'var(--primary)' }
} satisfies ChartConfig

export function AreaGraph() {
	const data: DevicesData[] = [
		{ month: 'January', desktop: 120, mobile: 80 },
		{ month: 'February', desktop: 150, mobile: 90 },
		{ month: 'March', desktop: 170, mobile: 110 },
		{ month: 'April', desktop: 140, mobile: 95 },
		{ month: 'May', desktop: 200, mobile: 130 },
		{ month: 'June', desktop: 220, mobile: 150 },
		{ month: 'July', desktop: 210, mobile: 140 },
		{ month: 'August', desktop: 230, mobile: 160 },
		{ month: 'September', desktop: 190, mobile: 120 },
		{ month: 'October', desktop: 250, mobile: 170 },
		{ month: 'November', desktop: 270, mobile: 180 },
		{ month: 'December', desktop: 300, mobile: 200 }
	]

	const totals = data.map(item => ({
		...item,
		total: item.desktop + item.mobile
	}))

	const topMonth = totals.sort((a, b) => b.total - a.total)[0]
	const totalSum = totals.reduce((acc, item) => acc + item.total, 0)

	const topPercentage = topMonth ? (topMonth.total / totalSum) * 100 : 0

	return (
		<Card className='@container/card'>
			<CardHeader>
				<CardTitle>Area Chart — Stacked</CardTitle>
				<CardDescription>
					Showing total visitors for the last 12 months
				</CardDescription>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-[250px] w-full'
				>
					<AreaChart
						data={data}
						margin={{ left: 12, right: 12 }}
					>
						<defs>
							<linearGradient
								id='fillDesktop'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-desktop)'
									stopOpacity={1.0}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-desktop)'
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id='fillMobile'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-mobile)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-mobile)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={value =>
								value.slice(0, 3)
							}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent indicator='dot' />
							}
						/>
						<Area
							dataKey='mobile'
							type='natural'
							fill='url(#fillMobile)'
							stroke='var(--color-mobile)'
							stackId='a'
						/>
						<Area
							dataKey='desktop'
							type='natural'
							fill='url(#fillDesktop)'
							stroke='var(--color-desktop)'
							stackId='a'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none font-medium'>
					{topMonth?.month} leads with{' '}
					{topPercentage.toFixed(1)}%{' '}
					<IconTrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Data from January to December{' '}
					{new Date().getFullYear()}
				</div>
			</CardFooter>
		</Card>
	)
}
