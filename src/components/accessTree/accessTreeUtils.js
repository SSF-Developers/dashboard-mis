import NameValue from "../../Entity/NameValue"
import TreeEdge from "../../Entity/TreeEdge"
import {TreeItemType} from "../../nomenclature/nomenclature"

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

export async function getTrimmedAccessTree(accessTree) {
    return new Promise(function(resolve, reject) {
        var emptyNodes = [];
        var trimmedAccessTree = JSON.parse(JSON.stringify(accessTree));
    
        var selectedStateCount = 0;
        var activeStateCount = 0;
    
        console.log("_accessTree", accessTree);
    
        if (accessTree != undefined)
            accessTree.map((state, stateIndex) => {
                if (state.selected == true) {
                    trimmedAccessTree[stateIndex].districts = undefined;
                    selectedStateCount++;
                    activeStateCount++;
                }else{
                    var selectedDistrictCount = 0;
                    var activeDistrictCount = 0;
                    if (state.districts != undefined)
                    state.districts.map((district, districtIndex) => {
                        if (district.selected == true) {
                            trimmedAccessTree[stateIndex].districts[districtIndex].cities = undefined;
                            selectedDistrictCount++;
                            activeDistrictCount++;
                        }else{
                            var selectedCitiesCount = 0;
                            var activeCitiesCount = 0;
                            if (district.cities != undefined)
                            district.cities.map((city, cityIndex) => {
                                if (city.selected == true) {
                                    trimmedAccessTree[stateIndex].districts[districtIndex].cities[cityIndex].complexes = undefined;
                                    selectedCitiesCount++;
                                    activeCitiesCount++;
                                }else{
                                    var selectedComplexesCount = 0;
                                    if (city.complexes != undefined)
                                    city.complexes.map((complex, complexIndex) => {
                                        if (complex.selected == true) {
                                            selectedComplexesCount++;
                                        }else{
                                            if(trimmedAccessTree[stateIndex] != undefined
                                                && trimmedAccessTree[stateIndex].districts[districtIndex] != undefined
                                                && trimmedAccessTree[stateIndex].districts[districtIndex].cities[cityIndex] != undefined){
                                                    //Remove Complex
                                                    //trimmedAccessTree[stateIndex].districts[districtIndex].cities[cityIndex].complexes.splice(complexIndex,1);
                                                    delete trimmedAccessTree[stateIndex].districts[districtIndex].cities[cityIndex].complexes[complexIndex];
                                                    emptyNodes.push(new TreeEdge(stateIndex,districtIndex,cityIndex,complexIndex));
                                            }
                                        }
                                    })

                                   
                                    if (selectedComplexesCount == 0) {
                                        if(trimmedAccessTree[stateIndex] != undefined
                                            && trimmedAccessTree[stateIndex].districts[districtIndex] != undefined){
                                             //Remove City
                                            //trimmedAccessTree[stateIndex].districts[districtIndex].cities.splice(cityIndex,1);
                                            delete trimmedAccessTree[stateIndex].districts[districtIndex].cities[cityIndex];
                                            emptyNodes.push(new TreeEdge(stateIndex, districtIndex, cityIndex));
                                        }    
                                    } else {
                                        activeCitiesCount++;
                                    }
                                }
                            })

                            if (activeCitiesCount == 0) {
                                if(trimmedAccessTree[stateIndex] != undefined){
                                    //Remove District
                                    delete trimmedAccessTree[stateIndex].districts[districtIndex];
                                    emptyNodes.push(new TreeEdge(stateIndex, districtIndex));
                                    //trimmedAccessTree[stateIndex].districts.splice(districtIndex,1);
                                }
                            } else {
                                activeDistrictCount++;
                            }
                        }
                    })

                    if (activeDistrictCount == 0) {
                        //Remove State
                        emptyNodes.push(new TreeEdge(stateIndex));
                        delete trimmedAccessTree[stateIndex];
                        //trimmedAccessTree.splice(stateIndex,1);
                    } else {
                        activeStateCount++;
                    }
                }
            })
    

            var resultantTree = JSON.parse(JSON.stringify(trimmedAccessTree));

            trimmedAccessTree.map((state, stateIndex) => {

                if (state == null) 
                    console.log("_trimmedAccess","null")
                else if (state == undefined) 
                console.log("_trimmedAccess","undefined")
                else
                console.log("_trimmedAccess","else")
                    

                if (state == "null") {
                    resultantTree.splice(stateIndex,1);
                }
                    state.districts.map((district, districtIndex) => {
                        if (district == "null") {
                            resultantTree[stateIndex].districts.splice(districtIndex,1);
                        }
                            district.cities.map((city, cityIndex) => {
                                if (city == "null") {
                                    resultantTree[stateIndex].districts[districtIndex].cities.splice(cityIndex,1);
                                }
                                    city.complexes.map((complex, complexIndex) => {
                                        if (complex == "null") {
                                            resultantTree[stateIndex].districts[districtIndex].cities[cityIndex].complexes.splice(complexIndex,1);
                                        }
                                    })
                            })
                    })
            })

            console.log("_trimmedAccess","trimmedAccessTree",trimmedAccessTree)
            console.log("_trimmedAccess","resultantTree",resultantTree)
            resolve(trimmedAccessTree);
    });
};