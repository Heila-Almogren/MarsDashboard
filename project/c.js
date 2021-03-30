
let store = Immutable.Map({

    user: { name: "Student" },
    curiosity: '',
    current_rover: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = state.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


const App = (state) => {


    return `
        <header></header>
        <main>
            
                <h3>“Curiosity is the essence of our existence”</h3>
                <p>Choose a rover</p>
<div class="gallery">

                ${curiosityImage()}
                ${opportunityImage()}
                ${spiritImage()}
                </div>
                <br>
                ${getRover()}
        </main>
        <footer></footer>`
}



window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS  ------------------------------------------------------
const getData = () => {
    let current_rover = store.get("current_rover")
    switch (current_rover) {
        case '': return
        case 'curiosity': return getCuriosityData(store)
        case 'Spirit': return 'Spirit'
        case 'Opportunity': return 'Opportunity'
        default: return
    }



}

const getRover = () => {


    console.log(store.get("current_rover"))
    if (!store.get("current_rover")) {
        getData()
    } else {
        if (store.get("current_rover") == '') { return }
        List = ''
        console.log("ohh" + JSON.stringify(store.get("current_rover")))
        info = `
    <br>
    <div style="display: block">
        <p>Launch date: ${store.get("current_rover").info.photos[0].rover.launch_date}</p>
        <p>Landing date: ${store.get("current_rover").info.photos[0].rover.landing_date}</p>
    </div>
        `
        for (i = 0; i < store.get("current_rover").info.photos.length; i++) {

            List += `<img src="${store.get("current_rover").info.photos[i].img_src}" height="350px" />`
        }
        return info + `<div class="rover_images_gallery">` + List + `</div>`
    }






    // switch (current_rover) {
    //     case '': return curiosityData()
    //     case 'curiosity': return 'curiosity'
    //     case 'Spirit': return 'Spirit'
    //     case 'Opportunity': return 'Opportunity'
    // }
}

const none_data = () => {
    return ''
}

// const curiosityData = (curiosity) => {



//     // If image does not already exist, or it is not from today -- request it again


// }

// ------------------------------------------------------  API CALLS ------------------------------------------------------

const setCurent = (chosen_rover) => {
    updateStore(store, store.set('current_rover', chosen_rover))
}


const getCuriosityData = (state) => {
    let { current_rover } = state

    data = fetch(`http://localhost:3000/curiosityData`)
        .then(res => res.json())
        .then(rover => {
            updateStore(store, store.set('current_rover', rover))
        })


    return data
}


// Return rover images

const curiosityImage = () => {

    return (`

<div class="roverListItemContainer">
<p class="roverListLabel">Curiosity</p>
<img class="roversListImage" onClick="setCurent('curiosity')" src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG" />
</div>
`)
}




const opportunityImage = () => {

    return (`
<div class="roverListItemContainer">
<p class="roverListLabel">Opportunity</p>
<img class="roversListImage" onClick="setCurent('Opportunity')" src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG" />
</div>
`)
}

const spiritImage = () => {

    return (`
<div class="roverListItemContainer">
<p class="roverListLabel">Spirit</p>
<img class="roversListImage" onClick="setCurent('Spirit')" src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG" />
</div>
`)
}



