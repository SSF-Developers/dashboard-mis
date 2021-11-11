//Core
import React, { Component } from "react";

//ReactUI
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Button
} from "reactstrap";

import { dashboardStyle, whiteSurface, colorTheme, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import icToilet from "../../assets/img/icons/ic_toilet.png"

class QuickConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    }

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{ ...whiteSurface, background: 'white', marginTop: '20px' }}>
                <div style={{ ...dashboardStyle.title }}>
                    Quick Config
                </div>
                <div className='row' style={{ width: "100%", padding: "10px", height: '200px', display: "flexbox", alignItems: "center", overflowY: 'auto' }}>
                    <this.DescriptionItem />
                    <this.DescriptionItem />
                    <this.DescriptionItem />
                    <this.DescriptionItem />
                    <this.DescriptionItem />
                </div>
            </div>
        );
    }

    DescriptionItem = (props) => {
        var border = ''
        return (
            <div className='col-md-4' style={{}}>


                <div style={{ border: '2px solid #5DC0A6', height: '110px', margin: "10px" }}>

                    <div style={{ background: colorTheme.primary, height: '60px', padding: '10px' }}>
                        <div style={{ ...dashboardStyle.itemTitle, float: 'left' }}>
                            Usage Charge Config
                        </div>
                        <div style={{ ...dashboardStyle.itemTitle, float: 'right' }}>
                            <Button
                                style={{ color:"white", border:'2px solid white', margin: "auto" }}
                                color="primary"
                                className="px-4"
                                outline
                                >
                                View
                            </Button>
                        </div>
                    </div>

                    <div style={{ ...whiteSurface, background: 'white', margin: '-8px 10px 0px 10px', height: '40px', padding: '10px' }}>
                        <div style={{...dashboardStyle.itemDescriprtion}}>
                            Configure payment charge and payment mode settings in one go.
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default QuickConfig;