let getCurrentCityName = function () {
  return new Promise(function (resolve, reject) {

    window.loadMap = function() {
      let myCity = new BMap.LocalCity()
      myCity.get(function (result) {
        resolve(result.name)
      })
    }


  })
}

export default getCurrentCityName
