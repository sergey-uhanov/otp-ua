import { auth } from '@/auth'

export default async function About() { 
	const session = await auth()
	return (
		<h1>About page</h1>
	)
}