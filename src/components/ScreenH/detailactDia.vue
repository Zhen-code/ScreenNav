<template>
    <div class="de" >
        <!-- 活动详情弹出层 -->
        <div class="deLeft">
            <img :style="{width:361+'px',height:514+'px'}" :src="activityList.leftImg" alt="">
        </div>
        <div class="deRight">
                <h1  :style="{fontSize:36+'px',textAlign:'left',width:680+'px'}">{{activityList.smallTittle}}</h1>
               <div class="detail">
                <h3 :style="{fontSize:24+'px'}">{{Day}}{{time}}</h3>
                 
                <div class="goto" @click="gg(activityList.id)"  :style="{position:'absolute',top:6+'px',right:50+'px',width:180+'px',height:70+'px',backgroundColor:'#463f3d',borderRadius:10+'px',display:'flex',justifyContent:'center',alignItems:'center'}">
                    <h1 :style="{color:'#ffffff',fontSize:26+'px'}">去这里</h1>
                </div>
                </div>
               <!-- <h3 :style="{marginTop:14+'px',marginLeft:30+'px',fontSize:24+'px'}">{{time}}  
                </h3> -->
                <div class="detail">

                     <h3 :style="{fontSize:24+'px'}">{{activityList.site}}</h3>
                </div>
                
                <div class="longDeatils" :style="{height:520+'px',}">
                    <h6 :style="{fontSize:24+'px',marginTop:20+'px',marginBottom:30+'px'}">活动简介</h6>
                    <div class="body">
                        <p :style="{fontSize:24+'px'}">{{activityList.content}}</p>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"detailactDia",
    props:{
        visible:{},
        activityList:{}
    },
 
    data(){
        return {
            vis:false,
            Day:'',
            time:''
        }
    },
       created(){
        console.log(this.activityList);
       if(this.activityList.length!=0){
            //  this.Day= this.activityList.time.slice(0,15)
             this.Day=this.getDay(this.activityList.time,0);
             this.time=this.getDay(this.activityList.time,1)
            // this.time= this.activityList.time.slice(16,40)
        }
       
    },
    methods:{
        getDay(obj,status){
            let index=obj.lastIndexOf('\日',index);
            if(status==0){
                obj=obj.slice(0,index+1)
            }
            else{
                obj=obj.slice(index+1,obj.length)
            }
            return obj;
        },
        gg(val){
            console.log(val);
            this.$emit('closeDia',false)
             this.$router.push({path:'/Hdaohang',name:"Hdaohang",params:{
                id:val
            }})
        }
    },
    watch:{
       activityList(val){
            console.log(val.time.length); 
             this.Day=this.getDay(this.activityList.time,0);
             this.time=this.getDay(this.activityList.time,1)
            console.log(this.time);
        }
    }
}
</script>

<style >

 .el-dialog{
        border-radius: 20px!important;
        margin-top: 21vh!important;
        margin-left: 180px;
     
    }
  .el-button{
        width: 100%;
        padding: 0;
        border:none;
    }
   .el-button span{
        width: 100%;
        height: 100%;
        display: block;
        display: flex;
    }
    .el-dialog__header{
        padding: 0;
    }
  .el-dialog__headerbtn{
        font-size: 40px;
        top: 48px;
        right: 50px;
    }
    /* .el-dialog__body{ */
        /* padding: 50px; */
    /* } */
    .de{
        width:100%;
        height: 741px;
        background-color: #ffffff;
        /* position: absolute; */
        padding: 20px 30px;
        border-radius: 40px;
        z-index: 999;
        display: flex;
    }
    .deLeft{
        width: 361px;
    }
    .deRight{
        flex:1;    
        margin-left:40px;
        }
         .deRight h1{
         color: #444444;
    }
  .deRight  h3{
         color: #444444;
        
    }
   .de .detail{
       position: relative;
        margin-top: 16px;
        width: 757px;
        display: flex;
        align-items: center;
    }
    .detail img{
        margin-right: 12px;
        width: 20px;
        height: 20px;
    }
    
</style>