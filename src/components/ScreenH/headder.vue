<template>
     <div class="head">
         <div class="right">
             <div class="time">
                 <div class="left">
                     <div class="date">
                     <p>{{nowDay}}</p>
                     </div>
                   <div class="xingqi">
                     <p>{{nowWeek}}</p>
                   </div>
                 </div>
                 <div class="right">
                     <h1>{{nowTime}}</h1>
                 </div>
             </div>
             <div class="weather">
                 <img  src="../../assets/img/19.png" alt="">
                 <h1>28<span class="unit"> ℃</span></h1>
             </div>
         </div>
     </div>
</template>

<script>
export default {
  name:"headder",
  data(){
      return{
          nowWeek:'',
          nowDay:'',
          nowTime:'',
      }
  },
  created(){
      this.getTime()
  },
  mounted(){
      setInterval(() => {
          setTimeout(()=>{
              this.getTime()
          })
      }, 1000);
  },
  methods:{
      
      getTime(){
          let Week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
          let myDate=new Date();
          let wK=myDate.getDay(); //4
          this.nowWeek=Week[wK];
          let year=myDate.getFullYear();
          let month=myDate.getMonth()+1;
          let date=myDate.getDate();
          date=date>=10?date:'0'+date;
          month=month>10?month:'0'+month;
          this.nowDay=year+'/'+month+'/'+date
        //   console.log(month);
          let hour=myDate.getHours();
          let minutes=myDate.getMinutes();
        //   let ss=myDate.getSeconds();
          hour=hour>=10?hour:'0'+hour;
          minutes=minutes>=10?minutes:'0'+minutes;
        //   ss=ss>=10?ss:'0'+ss;
        this.nowTime=hour+':'+minutes
        //   console.log(hour,minutes);
      }
  }
}
</script>

<style  scoped lang="scss">
   .head{
        display:flex;
        height: 10.18vh;
        align-items: center;
   }
   .head>.left{
        flex: 1;
        height: 4.63vh;
        display: flex;
        align-items: center;
    }
    .head>.left>h1{
        margin-left: 20px;
    }
    .head>.right{
        flex: 1;
         height: 4.63vh;
        display: flex;
        justify-content: flex-end;
      
    }
    .xingqi{
        p{
            font-size: 12px;
            font-family: "PingFang";
            font-weight: bold;
            color: #231815;
        }
    }
    .date{
        p{
            font-size: 12px;
          font-family: "PingFang";
            font-weight: bold;
          color: #231815;
        }
    }
    .time{
        width: 300px;
        display: flex;
          justify-content: flex-end;
          
    }
    .time .left{
         display: flex;
         justify-content: center;
        flex-direction: column;
        
    }
    .time .right{
        display: flex;
        align-items: center;

        margin-left: 20px;
        margin-right: 20px;
        
    }
     .time .right h1{
         font-family: PingFang;
        font-size: 40px;
       color: #231815;
       font-weight: bold;
     }
    .time .left .xingqi{
        text-align: end;
        margin-bottom: 3px;
    }
    .weather{
        /* margin-left: 10px; */
        width: 200px;
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 20px;
    }
    .weather>img{
        height: 100%;
        margin-right: 10px;
        /* width: 50%; */
    }
    .weather>h1{
        font-family: PingFang;
        font-size: 40px;
        font-weight: bold;
        color: #231815;
       width: 50%;
      position: relative;
    }
   .weather::before{
     content: '';
     display: block;
     position: absolute;
     width: 1px;
     height: 36px;
     left: 0;
     top: 6px;
     background-color: #878787;
   }
    .unit{
      font-family: PingFang;
      position: absolute;
      font-weight: bold;
      font-size: 16px;
      right: 20%;
      top: 10px;
    }
</style>

