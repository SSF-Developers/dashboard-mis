import NameValue from "../../../Entity/NameValue";
//Images
import healthOk from "../../../assets/img/icons/ic_health_ok.png";
import healthFault from "../../../assets/img/icons/ic_health_fault.png";
import healthNotInstalled from "../../../assets/img/icons/ic_health_feature_unavailable.png";

export function getCabinHealthData(rawData) {
    var healthList = [];
    var value = rawData['airDryerHealth'];
    healthList.push(new NameValue("Air Dryer",getStatusName(value),getStatusIcon(value)));
    value = rawData['chokeHealth'];
    healthList.push(new NameValue("Choke",getStatusName(value),getStatusIcon(value)));
    value = rawData['fanHealth'];
    healthList.push(new NameValue("Fan",getStatusName(value),getStatusIcon(value)));
    value = rawData['floorCleanHealth'];
    healthList.push(new NameValue("Floor Clean",getStatusName(value),getStatusIcon(value)));
    value = rawData['flushHealth'];
    healthList.push(new NameValue("Flush",getStatusName(value),getStatusIcon(value)));
    value = rawData['lightHealth'];
    healthList.push(new NameValue("Light",getStatusName(value),getStatusIcon(value)));
    value = rawData['lockHealth'];
    healthList.push(new NameValue("Lock",getStatusName(value),getStatusIcon(value)));
    value = rawData['odsHealth'];
    healthList.push(new NameValue("ODS",getStatusName(value),getStatusIcon(value)));
    value = rawData['tapHealth'];
    healthList.push(new NameValue("Tap",getStatusName(value),getStatusIcon(value)));

    return healthList;
};

function getStatusIcon(status){
    var statusIcons = {
        1: healthNotInstalled,
        2: healthFault,
        3: healthOk,
        0: healthNotInstalled
    };
   
    return statusIcons[status];
}

function getStatusName(status){
    var statusNames = {
        1:"Feature is not installed",
        2: "Fault detected in the unit",
        3: "Unit working fine",
        0: "Feature is not installed"
    };
    console.log('healthVal',status,statusNames[status])
    return statusNames[status];
}

export function getUsageProfileDisplayData(usageProfile) {
    var data = [];
    usageProfile.forEach(element => {
        data.push(
            {
                'Date': getUiDate(element['SERVER_TIMESTAMP']),
                'Time': getUiTime(element['SERVER_TIMESTAMP']),
                'Cabin Type': getCabinType(element['SHORT_THING_NAME']),
                'Duration': element['Duration'],
                'Usage Charge': element['Amountcollected'],
                'Feedback': element['feedback'],
                'Entry Type': element['Entrytype'],
                'Air Dryer': element['Airdryer'],
                'Fan Time': element['Fantime'],
                'Floor Clean': element['Floorclean'],
                'Full Flush': element['Fullflush'],
                'Manual Flush': element['Manualflush'],
                'Light Time': element['Lighttime'],
                'Mini Flush': element['Miniflush'],
                'Pre Flush': element['Preflush'],
                'RFID': element['RFID'],
                'Client': element['CLIENT'],
                'Complex': element['COMPLEX'],
                'State': element['STATE'],
                'District': element['DISTRICT'],
                'City': element['CITY']
            }
        );
    });
    return data;
};


export function getResetProfileDisplayData(resetProfile) {
    var data = [];
    resetProfile.forEach(element => {
        data.push(
            element
        );
    });
    return data;
};

function getUiDate(timestamp){
    var u = new Date(timestamp);

    var dd = ('0' + u.getUTCDate()).slice(-2);
    var mm = ('0' + u.getUTCMonth()).slice(-2);
    var yyyy = u.getUTCFullYear();
    
    return (dd+'/'+mm+'/'+yyyy);
  };

function getUiTime(timestamp){
    var u = new Date(timestamp);

    var hh = ('0' + u.getUTCHours()).slice(-2);
    var mm = ('0' + u.getUTCMinutes()).slice(-2);
    var ss = ('0' + u.getUTCSeconds()).slice(-2);
    var ms = (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
    return (hh+':'+mm+':'+ss);
}

function getCabinType(shortThingName){
    if(shortThingName.toUpperCase().includes('mwc'.toUpperCase()))
    return 'MWC'
    if(shortThingName.toUpperCase().includes('fwc'.toUpperCase()))
    return 'FWC'
    if(shortThingName.toUpperCase().includes('pwc'.toUpperCase()))
    return 'PWC'
    if(shortThingName.toUpperCase().includes('mur'.toUpperCase()))
    return 'MUR' 
}