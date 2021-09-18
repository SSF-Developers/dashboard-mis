import NameValue from "../../Entity/NameValue"

export function getAccessSummary(accessTree) {

    var stateCount = 0;
    var districtCount = 0;
    var cityCount = 0;
    var complexCount = 0;
    console.log("_accessTree", accessTree);

    if (accessTree != undefined)
        accessTree.map((state, stateIndex) => {
            if (state.recursive == 1) {
                stateCount++;
            }
            if (state.districts != undefined)
                state.districts.map((district, districtIndex) => {
                    if (district.recursive == 1) {
                        districtCount++;
                    }
                    if (district.cities != undefined)
                        district.cities.map((city, cityIndex) => {
                            if (city.recursive == 1) {
                                cityCount++;
                            }
                            if (city.complexes != undefined)
                                city.complexes.map((complex, complexIndex) => {
                                    complexCount++;
                                })
                        })
                })
        })

    return [
        new NameValue("State", stateCount),
        new NameValue("District", districtCount),
        new NameValue("City", cityCount),
        new NameValue("Complex", complexCount)];
};

export function getSelectionSummary(accessTree) {

    var stateCount = 0;
    var districtCount = 0;
    var cityCount = 0;
    var complexCount = 0;
    console.log("_accessTree", accessTree);

    if (accessTree != undefined)
        accessTree.map((state, stateIndex) => {
            if (state.selected == true) {
                stateCount++;
            }
            if (state.districts != undefined)
                state.districts.map((district, districtIndex) => {
                    if (district.selected == true) {
                        districtCount++;
                    }
                    if (district.cities != undefined)
                        district.cities.map((city, cityIndex) => {
                            if (city.selected == true) {
                                cityCount++;
                            }
                            if (city.complexes != undefined)
                                city.complexes.map((complex, complexIndex) => {
                                    if (complex.selected == true) {
                                        complexCount++;
                                    }
                                })
                        })
                })
        })

    return [
        new NameValue("State", stateCount),
        new NameValue("District", districtCount),
        new NameValue("City", cityCount),
        new NameValue("Complex", complexCount)];
};