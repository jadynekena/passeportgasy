const IDSHEET = '1X5KsKk1FGqiaEw2stbthPMdWQyhK0UDEu4ZffN7SDPw'
const APIKEY = 'ADEpC8zVwkkgsp-4xnWT87ibpA_lSVnBwNwr0z7llKMVdr2CrkBYS19Pi5cIPN9egE2_IkZMv6vDljFZ6uIjxCjDOWM4HYLjA9ImGRj2mIS24RAZLVD1lNIiFdCHpJ3dTXWBk_6ynv-w'
const APIURL = 'https://script.google.com/macros/s/AKfycbxASPbjGUjRiZM7ItRlwhHu3tnzdybaPypoFI3p4jF8AJTs8fmdpqw_ji9k46pm60Uf/exec'+
				'?_action=rest&APIKEY='+APIKEY+'&IDSHEET='+IDSHEET
var controller = {}

const uselessColumns = ['Country passport', 'Visa requirement ID', '_GSHEET_ROW_NUMBER']

const setLoading = (yes) => {
	document.querySelector('.loading').style.display = yes ? "block" : "none"
}

const updateJson = async (forcing) => {

	var res = getItem('datas')

	if(!res || forcing){
		const datas = await fetch(APIURL)
					.then(response => response.json())
					.then(data => data)

		//for each array of data
		//delete all useless columns
		datas.map(d => {
			uselessColumns.map((c) => {
				if(d[c]) delete d[c]
			})
		})

		//console.log({datas})

		setItem('datas', JSON.stringify(datas), true)
		return datas
	}else{
		return res
	}
}

const setItem = (itemName, itemValue, sessionMode) => {
	const storage = sessionMode ? window.sessionStorage.setItem(itemName, itemValue) : window.localStorage.setItem(itemName, itemValue)
	return itemValue
}

const getItem = (itemName) => {
	const res = window.localStorage.getItem(itemName) || window.sessionStorage.getItem(itemName) || ""
	if (isJson(res)){
		return JSON.parse(res)
	}else{
		return res
	}
}

const isJson = (str) => {
	try {
		if(str.length === 0){
			return false	
		}else{				
			const jsonVal = JSON.parse(str)
			return jsonVal.length > 0
		}
	}catch(err){
		console.log(str)
		console.log(err)
		return false
	}
}

const addGlobe = async (optionalContinent) => {
	// docs here :  https://giojs.org/html/docs/configureParams.html
	// Get the container to hold the IO globe
	// Create Gio.controller
	const container = document.getElementById( "globalArea" );
	const config = {
		color: {
            /*surface: "#FFF"*/
        },
        
        control: {
        	disableUnmentioned: true,
        	lightenMentioned: true,
        	initCountry: 'MG'
        }
	}
	const controller = new GIO.Controller( container, config );


	// Add data
	const finalDatas = transformedDatas(optionalContinent) //await remoteDatas() 
	//console.log({finalDatas})
	controller.addData( finalDatas );

	// Initialize and render the globe
	controller.setTransparentBackground( true ); 
	controller.init();

	applyTitle(currentContinent())


	return controller
}

const remoteDatas = async () => {
	const link = 'https://raw.githubusercontent.com/syt123450/giojs/master/examples/data/groupData.json'
	return await fetch(link).then(data => data.json()).then(data => data)
}

const currentContinent = () => {
	return document.querySelector('input:checked').id
}

const transformedDatas = (optionalContinent) => {
	var raw = getItem('datas')
	if(optionalContinent) raw = raw.filter(r => r['Continent'].toLowerCase() === optionalContinent.toLowerCase())

	var listOfAllDatas = {
		"dataSetKeys": ["All countries"],
		"initDataSet": currentContinent()
	}

	var resAll = raw.map((r,i) => {
		const countryCode = r["Country code"]
		const factor = r["Visa requirements"] === "Visa Free" ? 5 : 1; 
		const color = r["Visa requirements"] === "Visa Free" ? 'green' : 'orange'; 
		const continent = r["Continent"]

		const tmp = {
			i: countryCode, //i can also be a continent
			e: 'MG',
			v: 999999*factor,
			"outColor": color
		}

		//push to right continent IF THERE IS A COUNTRY CODE
		//and create key continent if does not exist
		if(!listOfAllDatas[continent]){
			listOfAllDatas[continent] = []
			listOfAllDatas['dataSetKeys'].push(continent)
		}

		if(countryCode){
			listOfAllDatas[continent].push(tmp)	
		} 

		return tmp

	}).filter(data => data.i)

	//console.log({listOfAllDatas})
	listOfAllDatas["All countries"] = resAll
	return listOfAllDatas

}

const getCountriesFromContinent = (title) => {
	return getItem('datas').filter(e => title.includes('All countries') ? true : e["Continent"].toLowerCase() === title.toLowerCase())
}

const applyTitle = (title)  => {
	const allCountries = getCountriesFromContinent(title)
	const nbCountries = allCountries.length
	const visaFreeCounter = allCountries.filter(e => e['Visa requirements'].includes('Free')).length
	const visaOnArrivalCounter = nbCountries - visaFreeCounter
	document.querySelector('#current').innerText = title + ' ('+nbCountries+')' //number of all countries

	//change number of free and on arrival visas (todo)
	//first : visa free
	document.getElementById("Visa Free").innerText = '('+visaFreeCounter+') '

	//second : visa on arrival
	document.getElementById("Visa on arrival").innerText = '('+visaOnArrivalCounter+') '
}



const switchContinent = (controller, cont) => {
	controller.switchCountry("MG")
	controller.switchDataSet(cont)

	applyTitle(cont)

}

const getAdditionalInfo = (selectedCountry) => {
	var additionalInfo = getItem('datas').find(e => e['Country code'] === selectedCountry.ISOCode)
	return formatJson(additionalInfo)
}

const formatJson = (json) => {
	var res = ""

	if(!json) return ""

	Object.keys(json).map(key => {
		res += '\n' + key + ' : ' + json[key]
	})
	return res
}


const countryPickHandler = (selectedCountry,relatedCountries ) => {
	const popupContent = (getAdditionalInfo(selectedCountry) || "No details found.")
	
	controller.switchCountry("MG")
	alert(popupContent)
}

const seeContinentDetails = () => {
	const cont = currentContinent()
	const popupContent = '----- ' +  cont + ' -----'
	
	//get all countries of the continent
	const relatedCountries = getCountriesFromContinent(cont)

	//store all informations 
	const infos = relatedCountries.map(e => {
		return formatJson(e) + '\n\n'
	}).join('')

	alert(popupContent + '\n' + infos)

}

const handleVisaDetails = (e) => {
	const clickedID = e.currentTarget.firstChild.id
	const cont = currentContinent()
	const popupContent = '----- ' + clickedID + ' -----'
	
	//get all countries of the continent
	var relatedCountries = getCountriesFromContinent(cont)

	//filter to keep only current visa detail
	relatedCountries = relatedCountries.filter(e => e["Visa requirements"] === clickedID)

	//store all informations 
	const infos = relatedCountries.map(e => {
		return formatJson(e) + '\n\n'
	}).join('')

	alert(popupContent + '\n' + infos)

}

const mainThread = async () => {
	setLoading(true)
	await updateJson()
	controller = await addGlobe()
	setLoading(false)

	controller.onCountryPicked(countryPickHandler);

	//on title click => more details
	document.querySelector("#title").addEventListener('click', seeContinentDetails)

	//on legend click => more details
	Array.from(document.querySelectorAll('.legend-item')).map(e => e.addEventListener('click', handleVisaDetails))

	//on click on any filter => apply continent
	Array.from(document.querySelectorAll("li")).map(li => {
		li.addEventListener('click', function(e){
			e.stopPropagation()
			//console.log('\n\n\n')

			const currentTarget = e.currentTarget.querySelector('input')
			//console.log({currentTarget})

			const finalContinent = currentTarget.id 
			//console.log({finalContinent})
			
			switchContinent(controller, finalContinent)

			//close details
			document.querySelector('details').removeAttribute('open')
		})
	})

}

document.addEventListener('DOMContentLoaded', mainThread)