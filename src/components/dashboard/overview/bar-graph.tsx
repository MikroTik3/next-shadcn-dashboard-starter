'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

export const description = 'An interactive bar chart'

const chartConfig = {
	desktop: { label: 'Desktop', color: 'var(--primary)' },
	mobile: { label: 'Mobile', color: 'var(--primary)' }
} satisfies ChartConfig

const data = [
	{ date: '01 Jan', desktop: 123, mobile: 82 },
	{ date: '02 Jan', desktop: 141, mobile: 77 },
	{ date: '03 Jan', desktop: 119, mobile: 95 },
	{ date: '04 Jan', desktop: 136, mobile: 88 },
	{ date: '05 Jan', desktop: 128, mobile: 80 },
	{ date: '06 Jan', desktop: 150, mobile: 99 },
	{ date: '07 Jan', desktop: 132, mobile: 85 },
	{ date: '08 Jan', desktop: 145, mobile: 90 },
	{ date: '09 Jan', desktop: 138, mobile: 83 },
	{ date: '10 Jan', desktop: 121, mobile: 96 },
	{ date: '11 Jan', desktop: 155, mobile: 89 },
	{ date: '12 Jan', desktop: 130, mobile: 84 },
	{ date: '13 Jan', desktop: 147, mobile: 92 },
	{ date: '14 Jan', desktop: 139, mobile: 81 },
	{ date: '15 Jan', desktop: 125, mobile: 87 },
	{ date: '16 Jan', desktop: 142, mobile: 93 },
	{ date: '17 Jan', desktop: 137, mobile: 86 },
	{ date: '18 Jan', desktop: 149, mobile: 91 },
	{ date: '19 Jan', desktop: 133, mobile: 88 },
	{ date: '20 Jan', desktop: 126, mobile: 95 },
	{ date: '21 Jan', desktop: 148, mobile: 90 },
	{ date: '22 Jan', desktop: 135, mobile: 83 },
	{ date: '23 Jan', desktop: 140, mobile: 92 },
	{ date: '24 Jan', desktop: 131, mobile: 85 },
	{ date: '25 Jan', desktop: 146, mobile: 94 },
	{ date: '26 Jan', desktop: 127, mobile: 87 },
	{ date: '27 Jan', desktop: 134, mobile: 89 },
	{ date: '28 Jan', desktop: 143, mobile: 91 },
	{ date: '29 Jan', desktop: 129, mobile: 86 },
	{ date: '30 Jan', desktop: 138, mobile: 90 },
	{ date: '31 Jan', desktop: 132, mobile: 88 },
	{ date: '01 Feb', desktop: 150, mobile: 95 },
	{ date: '02 Feb', desktop: 137, mobile: 82 },
	{ date: '03 Feb', desktop: 142, mobile: 89 },
	{ date: '04 Feb', desktop: 128, mobile: 91 },
	{ date: '05 Feb', desktop: 145, mobile: 87 },
	{ date: '06 Feb', desktop: 136, mobile: 84 },
	{ date: '07 Feb', desktop: 149, mobile: 92 },
	{ date: '08 Feb', desktop: 131, mobile: 85 },
	{ date: '09 Feb', desktop: 140, mobile: 90 },
	{ date: '10 Feb', desktop: 134, mobile: 88 },
	{ date: '11 Feb', desktop: 138, mobile: 93 },
	{ date: '12 Feb', desktop: 129, mobile: 86 },
	{ date: '13 Feb', desktop: 147, mobile: 89 },
	{ date: '14 Feb', desktop: 135, mobile: 84 },
	{ date: '15 Feb', desktop: 141, mobile: 91 },
	{ date: '16 Feb', desktop: 130, mobile: 87 },
	{ date: '17 Feb', desktop: 144, mobile: 90 },
	{ date: '18 Feb', desktop: 136, mobile: 85 },
	{ date: '19 Feb', desktop: 139, mobile: 88 },
	{ date: '20 Feb', desktop: 132, mobile: 92 },
	{ date: '21 Feb', desktop: 148, mobile: 86 },
	{ date: '22 Feb', desktop: 127, mobile: 89 },
	{ date: '23 Feb', desktop: 143, mobile: 91 },
	{ date: '24 Feb', desktop: 131, mobile: 87 },
	{ date: '25 Feb', desktop: 146, mobile: 90 },
	{ date: '26 Feb', desktop: 133, mobile: 88 },
	{ date: '27 Feb', desktop: 140, mobile: 85 },
	{ date: '28 Feb', desktop: 137, mobile: 92 },
	{ date: '29 Feb', desktop: 135, mobile: 89 }
]

export function BarGraph() {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>('desktop')
	const [chartData, setChartData] = React.useState<
		{ date: string; desktop: number; mobile: number }[]
	>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setChartData(data)
			setLoading(false)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	const total = React.useMemo(
		() => ({
			desktop: chartData.reduce(
				(acc, curr) => acc + curr.desktop,
				0
			),
			mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0)
		}),
		[chartData]
	)

	return (
		<Card className='@container/card !pt-3'>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
				<div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
					<CardTitle>Bar Chart — Interactive</CardTitle>
					<CardDescription>
						<span className='hidden @[540px]/card:block'>
							Total for the last 3 months
						</span>
						<span className='@[540px]/card:hidden'>
							Last 3 months
						</span>
					</CardDescription>
				</div>
				<div className='flex'>
					{(['desktop', 'mobile'] as const).map(key => (
						<button
							key={key}
							data-active={activeChart === key}
							className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
							onClick={() =>
								setActiveChart(
									key as keyof typeof chartConfig
								)
							}
						>
							<span className='text-muted-foreground text-xs'>
								{chartConfig[key].label}
							</span>
							<span className='text-lg leading-none font-bold sm:text-3xl'>
								{total[key]?.toLocaleString()}
							</span>
						</button>
					))}
				</div>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-[250px] w-full'
				>
					<BarChart
						data={chartData}
						margin={{ left: 12, right: 12 }}
					>
						<defs>
							<linearGradient
								id='fillBar'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='0%'
									stopColor='var(--primary)'
									stopOpacity={0.8}
								/>
								<stop
									offset='100%'
									stopColor='var(--primary)'
									stopOpacity={0.2}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
						/>
						<ChartTooltip
							cursor={{
								fill: 'var(--primary)',
								opacity: 0.1
							}}
							content={
								<ChartTooltipContent
									nameKey={activeChart}
								/>
							}
						/>
						<Bar
							dataKey={activeChart}
							fill='url(#fillBar)'
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
