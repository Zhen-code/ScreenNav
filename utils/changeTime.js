function changeTime(startTime,endTime){
    console.log(startTime,endTime);
    let Syear='';
    let Smonth='';
    let Sday='';
    let Shour='';
    let Smin='';
    let Ss='';
    let Eyear='';
    let Emonth='';
    let Eday='';
    let Ehour='';
    let Emin='';
    let Es='';
    let RSyear='';
    let REyear='';
    let RSmord='';
    let REmord='';
    if(startTime!=null){
      Syear=startTime.slice(0,4)+'年';
      Smonth=startTime.slice(5,7);
      if(Smonth<10){
          Smonth=Smonth.slice(1,2);
      }
      Sday=startTime.slice(8,10);
      if(Sday<10){
          Sday=Sday.slice(1,2)
      }
      Shour=startTime.slice(11,13);
      if(Shour<10){
         Shour=Shour.slice(2,1)
      }
      Smin=startTime.slice(14,16);
    //   Ss=startTime.slice(17,19);
    console.log(Syear,Smonth,Sday,Shour,Smin);
       
    }
    if(endTime!=null){
        Eyear=endTime.slice(0,4)+'年';
        Emonth=endTime.slice(5,7);
        if(Emonth<10){
            Emonth=Emonth.slice(1,2);
        }
        Eday=endTime.slice(8,10);
        if(Eday<10){
            Eday=Eday.slice(1,2)
        }
        Ehour=endTime.slice(11,13);
        if(Ehour<10){
           Ehour=Ehour.slice(2,1)
        }
        Emin=endTime.slice(14,16);
        console.log(Eyear,Emonth,Eday);
    }
    //判断年份是否相等
    if(Syear==Eyear){
        RSyear=Syear;
    }
    else {
        RSyear=Syear;
        REyear=Syear;
    }
    //判断月日是否相等
    if(Smonth==Emonth){
    if(Sday==Eday){
        RSmord=Smonth+'月'+Sday+'日'
     }
    else{
        RSmord=Smonth+'月'+Sday+'日至';
        REmord=Emonth+'月'+Eday+'日';
     }
    }
    else {
        RSmord=Smonth+'月'+Sday+'日至';
        REmord=Emonth+'月'+Eday+'日';
    }
    console.log(RSyear+RSmord+REmord+Shour+':'+Smin+'~'+Ehour+':'+Emin);
    return RSyear+RSmord+REmord+'\xa0'+Shour+':'+Smin+'~'+Ehour+':'+Emin
}
export default changeTime;