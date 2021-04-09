<template>
<!-- 楼层活动弹出组件 -->
    <div class="list" >

        <div class="goto" @click="gg(activityList.id)" :style="{borderRadius:10+'px' ,background:'#463f3d',position:'absolute',width:120+'px',height:50+'px',right:36+'px',top:20+'px'}">
            <p :style="{color:'#ffffff',fontSize:24+'px'}">到这里</p> </div>
        <h1>
            {{activityList.TotalTittle}}
        </h1>
        <div class="content">
            <div class="leftImg" :style="{width:84+'px',height:123+'px',marginLeft:30+'px'}">

            </div>
            <div class="right">
                <h2 class="smallT" :style="{fontSize:20+'px',marginTop:10+'px'}">{{activityList.list[0].smallTittle}}</h2>
               <div class="detail">

                <h3 >{{activityList.list[0].time}}</h3>
                </div>
                <div class="detail">

                     <h3>{{activityList.list[0].site}}</h3>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'detailActivity',
    props:{
        activityList:{

        },
        show:{

        }
    },
    data(){
        return{
            detailshow:this.show,
        }
    },
    created(){
        // console.log(this.activityList,this.detailshow);
    },
    methods:{
        close(){
            // this.detailshow=false;
            this.$emit('IsShow',false)
            // console.log(1111);
        },
        gg(val){
            this.close();
              this.$router.push({path:'/Hdaohang',name:"Hdaohang",params:{
                id:val
            }})
        }
    }
}
</script>

<style scoped>
    .list{
        width: 870px;
        height: 210px;
        background: #ffffff;
        position: absolute;
        bottom: 50px;
        left: -40px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .close{
        position: absolute;
        right:-15px;
        top:-15px;
    }
    .goto{
        display:flex;
            justify-content: center;
        align-items: center;
    }
    
    h1{
        margin-left: 40px;
        margin-top: 20px;
        font-size: 20px;
        margin-bottom: 10px;
        color: #444444;
    }
    .content{
        width: 100%;
        height: 123px;
        display: flex;
    }
    .right{
        margin-left: 20px;
        color:'#444444'
    }
    h2{
         color: #444444;
    }
    h3{
         color: #444444;
        
    }
    .detail{
        margin-top: 10px;
        display: flex;
        align-items: center;
    }
    .detail img{
        margin-right: 17px;
        width: 20px;
        height: 20px;
    }
</style>