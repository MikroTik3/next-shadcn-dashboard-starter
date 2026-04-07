import { ProductRow } from '@/components/dashboard/product/product-table/schema'
import { UserRow } from '@/components/dashboard/user/user-table/schema'
import { Icons } from '@/components/shared/icons'

export type Product = {
	photo_url: string
	name: string
	description: string
	created_at: string
	price: number
	id: number
	category: string
	updated_at: string
}

export type IconKey = keyof typeof Icons

export interface NavItem {
	title: string
	url: string
	icon: IconKey
	isActive: boolean
	shortcut: string[]
	items: NavItem[]
	disabled?: boolean
}

export const navItems: NavItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard/overview',
		icon: 'dashboard',
		isActive: false,
		shortcut: ['d', 'd'],
		items: []
	},
	{
		title: 'Products',
		url: '/dashboard/products',
		icon: 'product',
		shortcut: ['p', 'p'],
		isActive: false,
		items: []
	},
	{
		title: 'Users',
		url: '/dashboard/users',
		icon: 'user',
		shortcut: ['u', 'u'],
		isActive: false,
		items: []
	},
	{
		title: 'Kanban',
		url: '/dashboard/kanban',
		icon: 'kanban',
		shortcut: ['k', 'k'],
		isActive: false,
		disabled: true,
		items: []
	},
	{
		title: 'Chat',
		url: '/dashboard/chat',
		icon: 'chat',
		shortcut: ['c', 'c'],
		isActive: false,
		disabled: true,
		items: []
	}
]

export interface SaleUser {
	id: number
	name: string
	email: string
	amount: string
	image: string
	initials: string
}

export const recentSalesData: SaleUser[] = [
	{
		id: 1,
		name: 'Olivia Martin',
		email: 'olivia.martin@email.com',
		amount: '+₴1,999.00',
		image: 'https://api.slingacademy.com/public/sample-users/1.png',
		initials: 'OM'
	},
	{
		id: 2,
		name: 'Jackson Lee',
		email: 'jackson.lee@email.com',
		amount: '+₴39.00',
		image: 'https://api.slingacademy.com/public/sample-users/2.png',
		initials: 'JL'
	},
	{
		id: 3,
		name: 'Isabella Nguyen',
		email: 'isabella.nguyen@email.com',
		amount: '+₴299.00',
		image: 'https://api.slingacademy.com/public/sample-users/3.png',
		initials: 'IN'
	},
	{
		id: 4,
		name: 'William Kim',
		email: 'will@email.com',
		amount: '+₴99.00',
		image: 'https://api.slingacademy.com/public/sample-users/4.png',
		initials: 'WK'
	},
	{
		id: 5,
		name: 'Sofia Davis',
		email: 'sofia.davis@email.com',
		amount: '+₴39.00',
		image: 'https://api.slingacademy.com/public/sample-users/5.png',
		initials: 'SD'
	}
]

export const productsData: ProductRow[] = [
	{
		id: 1,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Wireless Headphones',
		price: 16303,
		description:
			'High-quality wireless headphones with noise cancellation.',
		stock: 15,
		recommended: true,
		category: 'Electronics'
	},
	{
		id: 2,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Smartwatch Series 7',
		description: 'Track your fitness and notifications on the go.',
		stock: 8,
		price: 16303,
		recommended: false,
		category: 'Electronics'
	},
	{
		id: 3,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Yoga Mat',
		description: 'Eco-friendly, non-slip yoga mat for all exercises.',
		stock: 25,
		price: 16303,
		recommended: true,
		category: 'Sports'
	},
	{
		id: 4,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Running Shoes',
		description:
			'Comfortable shoes designed for long-distance running.',
		stock: 12,
		recommended: true,
		price: 21002,
		category: 'Sports'
	},
	{
		id: 5,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Coffee Maker',
		description: 'Automatic coffee maker with programmable timer.',
		stock: 5,
		price: 15303,
		recommended: false,
		category: 'Home Appliances'
	},
	{
		id: 6,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Blender Pro',
		description: 'High-speed blender perfect for smoothies and soups.',
		stock: 20,
		price: 15303,
		recommended: true,
		category: 'Home Appliances'
	},
	{
		id: 7,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Gaming Chair',
		description: 'Ergonomic chair with lumbar support for gamers.',
		stock: 7,
		recommended: false,
		price: 301992,
		category: 'Furniture'
	},
	{
		id: 8,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Office Desk Lamp',
		description: 'LED lamp with adjustable brightness and angle.',
		stock: 30,
		recommended: true,
		price: 301992,
		category: 'Furniture'
	},
	{
		id: 9,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Electric Kettle',
		description: 'Fast-boiling kettle with auto shut-off feature.',
		stock: 18,
		price: 15303,
		recommended: true,
		category: 'Home Appliances'
	},
	{
		id: 10,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Travel Backpack',
		description:
			'Durable backpack with multiple compartments for travel.',
		stock: 10,
		recommended: false,
		price: 150303,
		category: 'Accessories'
	},
	{
		id: 11,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Noise-Canceling Earbuds',
		description: 'Compact earbuds with superior sound quality.',
		stock: 22,
		recommended: true,
		price: 15303,
		category: 'Electronics'
	},
	{
		id: 12,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Smart Home Hub',
		description: 'Control all smart devices from one hub.',
		stock: 9,
		recommended: false,
		price: 15303,
		category: 'Electronics'
	},
	{
		id: 13,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Fitness Tracker',
		description: 'Track steps, heart rate, and sleep patterns.',
		stock: 14,
		recommended: true,
		price: 21002,
		category: 'Sports'
	},
	{
		id: 14,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Adjustable Dumbbells',
		description: 'Space-saving dumbbells for home workouts.',
		stock: 5,
		recommended: false,
		price: 21002,
		category: 'Sports'
	},
	{
		id: 15,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Air Purifier',
		description: 'Removes dust, allergens, and odors from your room.',
		stock: 12,
		price: 15303,
		recommended: true,
		category: 'Home Appliances'
	},
	{
		id: 16,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Robot Vacuum Cleaner',
		description: 'Automatic vacuum cleaner with smart navigation.',
		stock: 6,
		price: 15303,
		recommended: false,
		category: 'Home Appliances'
	},
	{
		id: 17,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Standing Desk',
		description: 'Height-adjustable desk for ergonomic work setup.',
		stock: 7,
		recommended: true,
		price: 301992,
		category: 'Furniture'
	},
	{
		id: 18,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'LED Floor Lamp',
		description: 'Modern floor lamp with dimmable settings.',
		stock: 18,
		recommended: true,
		price: 301992,
		category: 'Furniture'
	},
	{
		id: 19,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Smart Thermostat',
		description: 'Control your home temperature remotely.',
		stock: 10,
		price: 15303,
		recommended: true,
		category: 'Home Appliances'
	},
	{
		id: 20,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Portable Charger',
		description: 'High-capacity power bank for phones and tablets.',
		stock: 30,
		recommended: false,
		price: 150303,
		category: 'Accessories'
	},
	{
		id: 21,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Bluetooth Speaker',
		description:
			'Compact speaker with deep bass and long battery life.',
		stock: 16,
		recommended: true,
		price: 15303,
		category: 'Electronics'
	},
	{
		id: 22,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Wireless Mouse',
		description: 'Ergonomic mouse with fast response and precision.',
		stock: 25,
		recommended: true,
		price: 15303,
		category: 'Electronics'
	},
	{
		id: 23,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Office Chair Mat',
		description: 'Protect your floor and improve chair mobility.',
		stock: 14,
		recommended: false,
		price: 301992,
		category: 'Furniture'
	},
	{
		id: 24,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Gaming Keyboard',
		description: 'Mechanical keyboard with RGB lighting.',
		stock: 11,
		recommended: true,
		price: 15303,
		category: 'Electronics'
	},
	{
		id: 25,
		image: 'https://freesvg.org/img/Placeholder.png',
		title: 'Laptop Stand',
		description: 'Adjustable stand to improve laptop ergonomics.',
		stock: 20,
		recommended: true,
		price: 150303,
		category: 'Accessories'
	}
]

export const usersData: UserRow[] = [
	{
		id: 1,
		firstname: 'Ivan',
		lastname: 'Petrenko',
		phone: '+380501112233',
		email: 'ivan.petrenko@gmail.com',
		status: 'active'
	},
	{
		id: 2,
		firstname: 'Oleg',
		lastname: 'Shevchenko',
		phone: '+380671234567',
		email: 'oleg.shevchenko@gmail.com',
		status: 'inactive'
	},
	{
		id: 3,
		firstname: 'Anna',
		lastname: 'Kovalenko',
		phone: '+380931112244',
		email: 'anna.kovalenko@gmail.com',
		status: 'active'
	},
	{
		id: 4,
		firstname: 'Maria',
		lastname: 'Bondarenko',
		phone: '+380501998877',
		email: 'maria.bondarenko@gmail.com',
		status: 'active'
	},
	{
		id: 5,
		firstname: 'Dmytro',
		lastname: 'Tkachenko',
		phone: '+380671234111',
		email: 'dmytro.tkachenko@gmail.com',
		status: 'active'
	},
	{
		id: 6,
		firstname: 'Olena',
		lastname: 'Melnyk',
		phone: '+380931234555',
		email: 'olena.melnyk@gmail.com',
		status: 'inactive'
	},
	{
		id: 7,
		firstname: 'Serhii',
		lastname: 'Krut',
		phone: '+380501777999',
		email: 'serhii.krut@gmail.com',
		status: 'active'
	},
	{
		id: 8,
		firstname: 'Andrii',
		lastname: 'Lysenko',
		phone: '+380671998822',
		email: 'andrii.lysenko@gmail.com',
		status: 'active'
	},
	{
		id: 9,
		firstname: 'Iryna',
		lastname: 'Marchenko',
		phone: '+380931776655',
		email: 'iryna.marchenko@gmail.com',
		status: 'active'
	},
	{
		id: 10,
		firstname: 'Viktor',
		lastname: 'Yatsenko',
		phone: '+380501223344',
		email: 'viktor.yatsenko@gmail.com',
		status: 'inactive'
	},
	{
		id: 11,
		firstname: 'Natalia',
		lastname: 'Romanenko',
		phone: '+380671112200',
		email: 'natalia.romanenko@gmail.com',
		status: 'active'
	},
	{
		id: 12,
		firstname: 'Bohdan',
		lastname: 'Savchenko',
		phone: '+380931667788',
		email: 'bohdan.savchenko@gmail.com',
		status: 'active'
	},
	{
		id: 13,
		firstname: 'Kateryna',
		lastname: 'Hrytsenko',
		phone: '+380501445566',
		email: 'kateryna.hrytsenko@gmail.com',
		status: 'active'
	},
	{
		id: 14,
		firstname: 'Yurii',
		lastname: 'Polishchuk',
		phone: '+380671556677',
		email: 'yurii.polishchuk@gmail.com',
		status: 'inactive'
	},
	{
		id: 15,
		firstname: 'Tetiana',
		lastname: 'Kravets',
		phone: '+380931998811',
		email: 'tetiana.kravets@gmail.com',
		status: 'active'
	},
	{
		id: 16,
		firstname: 'Roman',
		lastname: 'Oliinyk',
		phone: '+380501334455',
		email: 'roman.oliinyk@gmail.com',
		status: 'active'
	},
	{
		id: 17,
		firstname: 'Alina',
		lastname: 'Mazur',
		phone: '+380671223355',
		email: 'alina.mazur@gmail.com',
		status: 'active'
	}
]
