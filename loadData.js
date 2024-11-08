const APIURL = "https://script.google.com/macros/s/AKfycbzD_46m1h9fU9lEsvSEQTAHyCnZcj7FJnIwqqAv1tGaMfVdi2171_VkPK9fwnVnCTE/exec?malagasypassport=true"
var controller = {}

const uselessColumns = ['Country passport', 'Visa requirement ID', '_GSHEET_ROW_NUMBER']

const setLoading = (yes) => {
	document.querySelector('.loading').style.display = yes ? "block" : "none"
}

const updateJson = async (forcing) => {

	var res = getItem('data')

	if(!res || forcing){
		
		const data = await fetch(APIURL)
					.then(response => response.json())
					.then(data => data)

		//for each array of data
		//delete all useless columns
		data.map(d => {
			uselessColumns.map((c) => {
				if(d[c]) delete d[c]
			})
		})

		//console.log({data})

		setItem('data', JSON.stringify(data), true)
		return data
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
						control: {
				        	disableUnmentioned: true,
				        	lightenMentioned: true,
				        	initCountry: 'MG'
				        }
					}
	controller = new GIO.Controller( container, config );


	// Add data
	const finaldata_test = await remotedata() 
	console.log({finaldata_test})
	//controller.addData( finaldata_test );
	

	const finaldata = transformeddata(optionalContinent) 
	console.log({finaldata})
	controller.addData( finaldata );
	

	// Initialize and render the globe
	controller.setTransparentBackground( true ); 
	controller.init();

	applyTitle(currentContinent())


	return controller








}

const remotedata = async () => {
	const link = 'https://raw.githubusercontent.com/syt123450/giojs/master/examples/data/groupData.json'
	return await fetch(link).then(data => data.json()).then(data => data)
}

const currentContinent = () => {
	return document.querySelector('input:checked').id
}

const transformeddata = (optionalContinent) => {
	var raw = getItem('data')
	if(optionalContinent) raw = raw.filter(r => r['Continent'].toLowerCase() === optionalContinent.toLowerCase())

	var listOfAlldata = {
		"dataSetKeys": ["All countries"],
		"initDataSet": currentContinent()
	}

	var resAll = raw.map((r,i) => {
		const countryCode = r["Country code"]
		const factor = r["Visa requirements"] === "Visa Free" ? 3 : 1; 
		const color = r["Visa requirements"] === "Visa Free" ? 'lime' : 'orange'; 
		const continent = r["Continent"]

		const tmp = {
			i: countryCode, //i can also be a continent
			e: 'MG',
			v: 999999*factor,
			"outColor": color
		}

		//push to right continent IF THERE IS A COUNTRY CODE
		//and create key continent if does not exist
		if(!listOfAlldata[continent]){
			listOfAlldata[continent] = []
			listOfAlldata['dataSetKeys'].push(continent)
		}

		if(countryCode){
			listOfAlldata[continent].push(tmp)	
		} 

		return tmp

	}).filter(data => data.i)

	//console.log({listOfAlldata})
	listOfAlldata["All countries"] = resAll
	return listOfAlldata

}

const getCountriesFromContinent = (title) => {
	return getItem('data').filter(e => title.includes('All countries') ? true : e["Continent"].toLowerCase() === title.toLowerCase())
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
	var additionalInfo = getItem('data').find(e => e['Country code'] === selectedCountry.ISOCode)
	return formatJson(additionalInfo)
}

const formatJson = (json) => {
	var res = ""

	if(!json) return ""

	Object.keys(json).map(key => {
		res += '<br>' + '<strong>' + key  + '</strong>' + ' : ' + visaFormatting(convertToLink(json[key]))
	})
	//console.log({res})
	return res
}

const visaFormatting = (str) => {
	//console.log('\n\n'+str)
	str = str.toString()
	if(str.toLowerCase() === 'visa free'){
		//console.log('free')
		return '<strong style="background-color:lime;">'+str+'</strong>'
	}else if(str.toLowerCase() === 'visa on arrival'){
		//console.log('arrival')
		return '<strong style="background-color:orange;">'+str+'</strong>'
	}else{
		//console.log('normal')
		return str
	}
}

const convertToLink = (val) => {
	if(isURL(val)){
		return '<a class="nd" target="_blank" href="'+val+'">'+val+'</a>'
	}else{
		return val
	}
}

const isURL = (str) => {
  let url;
  
  try {
    url = new URL(str||"");
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";

}

const getCountryDetailsFromISO = (iso,detail) => {
	var res = getItem('data').find(e => e['Country code'] === iso) || ""
	if(res && res[detail]){
		res = res[detail]
	}

	return res
}

const countryPickHandler = (selectedCountry,relatedCountries ) => {
	const iso = selectedCountry.ISOCode || "MG"
	const img = '<img src="'+flagURL(iso)+'" class="flagInfo">'
	const popupContent = img + (getAdditionalInfo(selectedCountry) || "<p>Madagascar, where the passport is from.</p>")
	const countryName =  getCountryDetailsFromISO(iso, "Country") || "Madagascar"

	controller.switchCountry("MG")
	alert(countryName, popupContent)
}

const seeContinentDetails = () => {
	const cont = currentContinent()
	
	//get all countries of the continent
	const relatedCountries = getCountriesFromContinent(cont)

	//store all informations 
	const infos = countriesInfos(relatedCountries)

	alert(cont, infos)

}

const handleVisaDetails = (e) => {
	const clickedID = e.currentTarget.firstChild.id
	const cont = currentContinent()
	
	//get all countries of the continent
	var relatedCountries = getCountriesFromContinent(cont)

	//filter to keep only current visa detail
	relatedCountries = relatedCountries.filter(e => e["Visa requirements"] === clickedID)

	//store all informations 
	const infos = countriesInfos(relatedCountries)

	alert(clickedID, infos)

}

const flagURL = (countryISO) => {
	return "https://flagsapi.com/"+countryISO+"/shiny/64.png"
}

const countriesInfos = (relatedCountries) => {
	const infos = relatedCountries.map(e => {
		const img = '<img src="'+flagURL(e["Country code"])+'" class="flagInfo">'
		return '<div class="info">'+ img +  formatJson(e) + '</div>'
	}).join('')

	return  infos
}

const displayPopup = (yes) => {
	const popup = document.getElementById('popup')
	popup.style.visibility = yes ? 'visible' : 'hidden'
}

const alert = (infoTitle,content) => {
	document.getElementById('infoTitle').innerText = infoTitle
	document.getElementById('popupContent').innerHTML = content
	displayPopup(true)
}

const mainThread = async () => {
	setLoading(true)
	await updateJson()
	controller = await addGlobe()
	setLoading(false)

	//console.log(controller)
	controller.onCountryPicked(countryPickHandler);

	//on nav detail => hide popup
	document.querySelector("#topbar").addEventListener('click', function(){
		displayPopup(false)
	})


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