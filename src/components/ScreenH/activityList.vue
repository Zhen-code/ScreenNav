<template>
        <!-- 活动组件 -->
    <div class="Bigcontainer">
     <div class="list" v-for="(item,index) in activityList.list" :key="index">
        <div class="left" @click="detailShow(index)">
        <el-button type="text" @click="dialogTableVisible = true">  
        <div class="content">
        <div class="leftImg" :style="{width:84+'px',height:123+'px',marginRight:30+'px'}">
        <div v-if="item.status==2" class="holding"><h6>正在举办</h6></div>
        <div v-if="item.status==0" class="Cominghold"><h6>即将举办</h6></div>
        <img :style="{width:84+'px',height:123+'px'}" :src="item.leftImg" alt="">
        </div>
        <div class="right">
            <h1  :style="{fontSize:30+'px',marginTop:10+'px',textAlign:'left'}">{{item.smallTittle}}</h1>
        <div class="detail">
           
                <h3 >{{item.time}}</h3>
                </div>
                <div class="detail">

                <h3>{{item.site}}</h3>
                </div>
            </div>
        </div>
        </el-button>
         </div>
       <div class="ri" @click="clickGo(item.id)">
            <div class="goto" :style="{borderRadius:10+'px' ,background:'#463f3d',width:120+'px',height:50+'px'}">
            <p :style="{color:'#ffffff',fontSize:24+'px'}">到这里</p> </div>
       </div>
    </div>
    <el-dialog  width=" 1258px"  :visible.sync="dialogTableVisible" >
     <detailactDia @closeDia="closeDia" :activityList="List" v-if="List!=null"></detailactDia>
</el-dialog>
    </div>
</template>

<script>
import DetailActivity from './detailActivity.vue';
import detailactDia from "./detailactDia"
export default {
    name:"activityList",
    components:{
       detailactDia
       
    },
    props:{
        activityList:{

        }
    },
    created()
    {
        console.log(this.activityList);
    },
    data(){
        return {
            List:{},
            dialogTableVisible: false,
             dialogVisible: false
        }
    },
    methods:{
        clickGo(index){
            console.log(index);
            // this.$router.push('/Hdaohang')
            this.$router.push({path:'/Hdaohang',name:"Hdaohang",params:{
                id:index,
                site: "WHG",
                floor: "2F"
            }})
            
        },
        closeDia(val){
            this.dialogTableVisible=val;
        },
        detailShow(index){
          console.log(index);
          this.List= this.activityList.list[index];
          console.log(this.List);
         
        },
        
    }
}
</script>

<style scoped lang="scss">

 .list{
    

        height: 210px;
        display: flex;
        border-bottom: 2px solid #dcdcdc;
        margin-left: 40px;
        margin-right: 40px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
       
 }
    .goto{
        display:flex;
            justify-content: center;
        align-items: center;
    }
    
   
    .content{
        width: 100%;
        height: 123px;
        display: flex;
        .leftImg{
            position: relative;
            .holding{
                width: 71px;
                height: 28px;
                background: #9e140c;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                h6{
                    font-size: 14px;
                    color: #ffffff;
                }
            }
            .Cominghold{
                 width: 71px;
                height: 28px;
                background: #f19149;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                h6{
                    font-size: 14px;
                    color: #ffffff;
                }

            }
        }
    }
   
  .Bigcontainer .left{
            flex: 1;
        margin-top: 30px;
    }
   .Bigcontainer .list:nth-child(1) .left{
        flex: 1;
        margin-top: 40px;
     
    }
     .Bigcontainer .ri{
         margin-top: 30px;
        color:'#444444';
        width: 120px;
    }
  .Bigcontainer .list:nth-child(1) .ri{ 
      margin-top: 40px;
        color:'#444444';
        width: 120px;
    }
    h1{
         color: #444444;
         font-family: 'PingFang';
    }
    h3{
        letter-spacing: 1px;
         color: #444444;
         font-family: 'PingFang';
        font-size: 24px;
    }
    .detail{
        margin-top: 20px;
        display: flex;
        align-items: center;
    }
    .detail img{
        margin-right: 17px;
        width: 20px;
        height: 20px;
    }
</style>