
let store = Immutable.Map({

    user: { name: "Student" },
    curiosity: '',
    current_rover: '',
    rover_data: '',
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

    let { rovers, rover_data } = state
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
                ${getRover(state)}
        </main>
        <footer></footer>`
}



window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS  ------------------------------------------------------


const getRover = (store) => {



    if (!store.get("rover_data")) {
        return ''

    } else {

        List = ''

        info = `
        <br>
        <div style="display: block">
            <p>Launch date: ${store.get("rover_data").launch_date}</p>
            <p>Landing date: ${store.get("rover_data").landing_date}</p>
        </div>
            `
        for (i = 0; i < store.get("rover_data").photos.length; i++) {

            List += `<img class="camera_image" src="${store.get("rover_data").photos[i].img_src}" height="350px" />`
        }
        return info + `<div class="rover_images_gallery">` + List + `</div>`
    }


}

const getData = (current_rover) => {

    switch (current_rover) {

        case 'curiosity': return getCuriosityData(store)
        case 'Spirit': return getSpiritData(store)
        case 'Opportunity': return getOpportunityData(store)
        default: return
    }

}


// ------------------------------------------------------  API CALLS ------------------------------------------------------

const setCurent = (chosen_rover) => {

    updateStore(store, store.set('current_rover', chosen_rover))
    getData(chosen_rover)
}


const getCuriosityData = (state) => {
    let { rover_data } = state

    data = fetch(`http://localhost:3000/curiosityData`)
        .then(res => res.json())
        .then(res => ({
            launch_date: res.info.photos[0].rover.launch_date,
            landing_date: res.info.photos[0].rover.landing_date,
            photos: res.info.photos.map(photo => ({
                img_src: photo.img_src,
            }))
        }))
        .then(rover_data => {
            updateStore(store, store.set('rover_data', rover_data))
        }).then(rover_data => {
            console.log(JSON.stringify(store.get("rover_data")))
        })


    return data
}

const getOpportunityData = (state) => {
    let { rover_data } = state

    data = fetch(`http://localhost:3000/opportunityData`)
        .then(res => res.json())
        .then(res => ({
            launch_date: res.info.photos[0].rover.launch_date,
            landing_date: res.info.photos[0].rover.landing_date,
            photos: res.info.photos.map(photo => ({
                img_src: photo.img_src,
            }))
        }))
        .then(rover_data => {
            updateStore(store, store.set('rover_data', rover_data))
        })


    return data
}

const getSpiritData = (state) => {
    let { rover_data } = state

    data = fetch(`http://localhost:3000/spiritData`)
        .then(res => res.json())
        .then(res => ({
            launch_date: res.info.photos[0].rover.launch_date,
            landing_date: res.info.photos[0].rover.landing_date,
            photos: res.info.photos.map(photo => ({
                img_src: photo.img_src,
            }))
        }))
        .then(rover_data => {
            updateStore(store, store.set('rover_data', rover_data))

        })


    return data
}




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



