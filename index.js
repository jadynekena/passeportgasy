const URLs = {
	raw : 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=893600676&amp;format=interactive',
	countries : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=115272302&amp;format=interactive",
	avgstay : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=1208183497&amp;format=interactive",
	visa : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=1451826979&amp;format=interactive", 
	africa : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=2069266831&amp;format=interactive",
	asia: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=1100700383&amp;format=interactive",
	america: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=918790667&amp;format=interactive",
	oceania: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGx7Xf9FxKWpzsb2og7Vt3L-sxSgMqlTXrAmKvN6iS41jSZt1_ALN4RELeImePiA/pubchart?oid=269380431&amp;format=interactive",

}

const baseURLdetails = "https://docs.google.com/spreadsheets/d/1PJk3cYbyaubFcl4aRdcFmy0TpeDKl6ms/pubhtml?gid=#gid&widget=false&headers=false&chrome=false"//+"&range="
const firstCell = 'B1'
const detailsURLs = {
	africa : {gid: '1611475413', range: firstCell+":J26"},
	america: {gid: '1951907604', range: firstCell+":J14"},
	asia: {gid: '1166374933', range: firstCell+":J13"},
	oceania: {gid: '740071953', range: firstCell+":J7"},
	raw: {gid: '391501328', range: firstCell+":J57" }
}



const bigframes = ['raw']

function main(){
	applySrc(currentlyChecked())
	Array.from(document.querySelectorAll('li')).map(e => e.addEventListener('click', changeIframeSrc))
}

function currentlyChecked(){
	return document.querySelector(':checked').id
}

function changeIframeSrc(e){
	const idInput = e.currentTarget.querySelector('input').id
	applySrc(idInput)
}

function applySrc(idInput){
	//main frame source
	const src = URLs[idInput]
	const viz = document.querySelector('#viz')
	viz.src = src

	//main frame height
	viz.className = bigframes.indexOf(idInput) >=0 ? 'mediumframe' : 'smallframe'

	//details
	const srcDetails = detailsURLs[idInput]

	const detailsFrame = document.querySelector('#details')
	if(srcDetails){
		const urlDetails = baseURLdetails.replace('#gid',srcDetails.gid) //+ srcDetails.range 
		//console.log({urlDetails})
		detailsFrame.src = urlDetails
		detailsFrame.className = detailsFrame.className.replaceAll('hidden','')
		document.querySelector('#framewrap').className = "wrapflex"
	}else{
		detailsFrame.src = ""
		detailsFrame.className += ' hidden'
		document.querySelector('#framewrap').className = ""
	}
}

main()