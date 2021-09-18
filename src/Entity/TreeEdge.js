import {TreeItemType} from "../nomenclature/nomenclature"

class TreeEdge
{
    constructor(stateIndex,districtIndex,cityIndex,complexIndex) {
        this.stateIndex = stateIndex;
        this.districtIndex = districtIndex;
        this.cityIndex = cityIndex;
        this.complexIndex = complexIndex;  

        if(this.districtIndex == undefined)
            this.type = TreeItemType.State;
        else if(this.cityIndex == undefined)
            this.type = TreeItemType.District;
        else if(this.complexIndex == undefined)
            this.type = TreeItemType.City;
        else 
            this.type = TreeItemType.Complex;
    };   
}

export default TreeEdge