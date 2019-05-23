const rp = require('request-promise')

async function main(){
	const result = await 20

	await new Promise (resolve => {
		setTimeout(resolve, 1000)
	})

	return result

main()
	.then(console.log)
	.catch(console.error)
