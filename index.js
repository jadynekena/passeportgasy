const URLs = {
	raw : 'https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubhtml?widget=true&amp;headers=true#gid=391501328',
	stay : "",
	duration : "", 
	distance : "",
}

function main(){
	applySrc('raw')
	Array.from(document.querySelectorAll('li')).map(e => e.addEventListener('click', changeIframeSrc))
}

function changeIframeSrc(e){
	const idInput = e.currentTarget.querySelector('input').id
	applySrc(idInput)
}

function applySrc(idInput){
	const src = URLs[idInput]
	document.querySelector('#viz').src = src
}

main()