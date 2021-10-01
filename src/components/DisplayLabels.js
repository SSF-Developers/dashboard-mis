import React from "react";

export function NameValueList(props)  {
  var labelStyle = {}
  
  if('labelStyle' in props){
    labelStyle = props.labelStyle
  }

  if ('withPadding' in props){
    labelStyle = {...labelStyle, margin:"20px"}
  }

  return (
    <div  style={{ margin:"10px 10px 10px 10px",width:"100%"}}>
        {props.data.map((item, index) => {
          return <NameValueLabel data={item} labelStyle ={labelStyle}/>
        })}
    </div>
  );
}

function NameValueLabel(props)  {
  return (
    <div className="row" style={props.labelStyle}>
       
       <div 
       className="col-md-6"
       style={{textAlign: "right", padding:"0"}}>
        {props.data.name} : 
      </div>

      <div
      className="col-md-6"
        style={{
          textAlign: "left",
          padding:"0",
          paddingLeft:"2px"
        }}
      >
        
        <b> {props.data.value}</b>
        
      </div>


    </div>
  );
}

function NameValueLabelWithPadding(props)  {
  return (
    <div className="row" style={{margin:"10px"}}>
       
       <div 
       className="col-md-6"
       style={{textAlign: "right", padding:"0"}}>
        {props.data.name} : 
      </div>

      <div
      className="col-md-6"
        style={{
          textAlign: "left",
          padding:"0",
          paddingLeft:"2px"
        }}
      >
        
        <b> {props.data.value}</b>
        
      </div>


    </div>
  );
}