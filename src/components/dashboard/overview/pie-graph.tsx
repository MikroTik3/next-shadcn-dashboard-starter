'use client'

import { IconTrendingUp } from '@tabler/icons-react'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

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

const chartConfig = {
	visitors: {
		label: 'Visitors'
	},
	chrome: { label: 'Chrome', color: 'var(--primary)' },
	safari: { label: 'Safari', color: 'var(--primary)' },
	firefox: { label: 'Firefox', color: 'var(--primary)' },
	edge: { label: 'Edge', color: 'var(--primary)' },
	other: { label: 'Other', color: 'var(--primary)' }
} satisfies ChartConfig

// Function to generate a random number
const randomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min

export function PieGraph() {
	// Fake data
	const [chartData, setChartData] = React.useState([
		{
			browser: 'Chrome',
			visitors: randomNumber(5000, 15000),
			fill: 'var(--primary)'
		},
		{
			browser: 'Safari',
			visitors: randomNumber(2000, 10000),
			fill: 'var(--primary-light)'
		},
		{
			browser: 'Firefox',
			visitors: randomNumber(1000, 8000),
			fill: 'var(--primary-lighter)'
		},
		{
			browser: 'Edge',
			visitors: randomNumber(500, 5000),
			fill: 'var(--primary-dark)'
		},
		{
			browser: 'Other',
			visitors: randomNumber(200, 3000),
			fill: 'var(--primary-darker)'
		}
	])

	const totalVisitors = React.useMemo(
		() => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
		[chartData]
	)

	return (
		<Card className='@container/card'>
			<CardHeader>
				<CardTitle>Pie Chart</CardTitle>
				<CardDescription>
					<span className='hidden @[540px]/card:block'>
						Total number of visitors by browser for the
						last 6 months
					</span>
					<span className='@[540px]/card:hidden'>
						Browser distribution
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square h-[250px]'
				>
					<PieChart>
						<defs>
							{chartData.map((item, index) => (
								<linearGradient
									key={item.browser}
									id={`fill${item.browser}`}
									x1='0'
									y1='0'
									x2='0'
									y2='1'
								>
									<stop
										offset='0%'
										stopColor={
											item.fill
										}
										stopOpacity={
											1 -
											index * 0.15
										}
									/>
									<stop
										offset='100%'
										stopColor={
											item.fill
										}
										stopOpacity={
											0.8 -
											index * 0.15
										}
									/>
								</linearGradient>
							))}
						</defs>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
								/>
							}
						/>
						<Pie
							data={chartData.map(item => ({
								...item,
								fill: `url(#fill${item.browser})`
							}))}
							dataKey='visitors'
							nameKey='browser'
							innerRadius={60}
							strokeWidth={2}
							stroke='var(--background)'
						>
							<Label
								content={({ viewBox }) =>
									viewBox &&
									'cx' in viewBox &&
									'cy' in viewBox ? (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor='middle'
											dominantBaseline='middle'
										>
											<tspan
												x={
													viewBox.cx
												}
												y={
													viewBox.cy
												}
												className='fill-foreground text-3xl font-bold'
											>
												{totalVisitors.toLocaleString()}
											</tspan>
											<tspan
												x={
													viewBox.cx
												}
												y={
													(viewBox.cy ||
														0) +
													24
												}
												className='fill-muted-foreground text-sm'
											>
												Total
											</tspan>
										</text>
									) : null
								}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none font-medium'>
					34.6
					%
					<IconTrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Data from January - June 2024
				</div>
			</CardFooter>
		</Card>
	)
}
