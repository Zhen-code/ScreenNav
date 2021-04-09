<template>
<div>
   <div class="main" >
       <div class="w">
           <headder></headder>
       <div class="tittle">
           <h1>活动列表</h1>
       </div>
       <div class="contentBig">
       <div class="content">
          
           <act-list @click.native="showMask()" :activityList="activityList"></act-list>
       </div>
       <div class="right">
       <div class="goBack" @click="$router.go(-1)">
           <h1>地图</h1>
       </div>
       </div>
       </div>
       </div>
   </div>
    
   </div>
</template>

<script>
import ActList from '../../components/ScreenH/activityList.vue'
import headder from "../../components/ScreenH/headder"
export default {
    name:'Hactivity',
    components:{
        headder,
        ActList,
      
    },
    data(){
        return {
            sm:false,
             activityList:{
              TotalTittle:"近期举行活动 / 展览",
              list:[
                //   {
                //     //   id:'001',
                //     //   leftImg:'',
                //     //   smallTittle:'艺海问道',
                //     //   time:'2020年6月3日至6月15日 上午9：00-12：00 下午2：30-5：00',
                //     //   site:'广州市文化馆'
                //   },
              ]
          }
        }

    },
    created(){
       this.$request.getURL('/v1/activity/informationScreen').then(res=>{
        //    this.activityList.list=res.data;
        //    let list=this.activityList.list;
        // list=res.data;
        res.data.forEach(item=> {
            // console.log(item.beginTime,item.endTime);
         let time=this.$changeTime(item.beginTime,item.endTime);
         console.log(time);
            this.activityList.list.push({id:item.id,leftImg:item.picture,smallTittle:item.activityName,time:time,
            site:item.location,status:item.status,content:item.content});
             
        });
        // console.log(this.activityList.list);
        this.activityList.list.sort((a,b)=>{
            return b.status-a.status;
            // console.log(a,b);
        })
           
       })
    },
    methods:{
        showMask(){
            console.log(222);
            this.sm=true
        }
    }

}
</script>

<style scoped>
   .main{
    height: 100vh;
    width: 100%;
     overflow: auto;
}

 .w{
       margin-left: 40px;
       margin-right: 40px;
       height: 100vh;
       /* margin-bottom: 40px; */
   }
   .tittle{
       margin-left: 32px;
   }
   .tittle h1{
       font-size: 36px;
       color: #ffffff;
   }
   .contentBig{
       display: flex;
      height: 100%;
   }
    .content{
        overflow-y: auto;
        margin-top: 40px;
        width: 80%;

        border-radius: 20px;
        
        /* -webkit-scrollbar:12px 20px; */
       
    }
    ::-webkit-scrollbar {
             width: 12px;
  
        }
        ::-webkit-scrollbar-thumb {
         border-radius: 12px;
        background: #959595;

        }



    .right{
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        margin-top: 700px;
    }
    .goBack{
        width: 170px;

        height: 170px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #62656c;
        border-radius: 20px;
        color: #e6b887;
        position: relative;
    }
</style>