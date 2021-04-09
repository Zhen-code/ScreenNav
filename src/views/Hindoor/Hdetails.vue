<template>
  <div class="main">
    <div class="header">
      <h2 class="header-title">{{title1}}</h2>
      <headder></headder>
    </div>
    <div class="center">
      <div class="left-nav">
        <div :class="floorIndex==i?'activefloor':'floor'" v-for="(item,i) in bottomListB[siteIndex]['floor']" :key="i" @click="handleFloor(i)">
          {{item}}
        </div>
      </div>
      <div class="right-nav">
        <nav-map  ref="navmap"></nav-map>
      </div>
    </div>
    <div class="bottom">
      <div class="img-list">
        <div class="img-name"><img src="../../assets/img/12.png"/><span>展馆</span></div>
        <div class="img-name"><img src="../../assets/img/13.png"/><span>厕所</span></div>
        <div class="img-name"><img src="../../assets/img/14.png"/><span>楼梯</span></div>
        <div class="img-name"><img src="../../assets/img/15.png"/><span>教室</span></div>
        <div class="img-name"><img src="../../assets/img/16.png"/><span>电梯</span></div>
      </div>
      <div class="btn-list">
        <div class="btn" @click="handleClick('view')">
          <img v-if="this.view === '3d'" :src="active == 'view'?require('../../assets/img/08.png'):require('../../assets/img/04.png')" @click="viewChange('2d')"/>
          <img v-else :src="active == 'view'?require('../../assets/img/21.png'):require('../../assets/img/20.png')" @click="viewChange('3d')"/>
          <span :class="active == 'view'?'text1':'text2'">视图</span>
        </div>
        <div class="btn" @click="handleClick('reset')">
          <img :src="active == 'reset'?require('../../assets/img/09.png'):require('../../assets/img/05.png')"/>
          <span :class="active == 'reset'?'text1':'text2'">复位</span>
        </div>
        <div class="btn" @click="handleClick('activity')">
          <img :src="active == 'activity'?require('../../assets/img/10.png'):require('../../assets/img/06.png')"/>
          <span  :class="active == 'activity'?'text1':'text2'">活动</span>
        </div>
        <div class="btn" @click="handleClick('nav')">
          <img :src="active == 'nav'?require('../../assets/img/11.png'):require('../../assets/img/07.png')"/>
          <span  :class="active == 'nav'?'text1':'text2'">导航</span>
        </div>
      </div>
    </div>
    <footer class="footer">
               <div class="left">
                   <h1>广州文化馆</h1>
               </div>
              <div class="right">
                <div class="right-box">
                  <div :class="siteIndex==i?'siteA':'site'" v-for="(item,i) in bottomList" :key="i" @click="handleSite(i)">
                    <div :class="siteIndex==i?'site-name-A':'site-name'">{{item}}</div>
                  </div>
                </div>
              </div>
    </footer>
    <div class="left-box" v-show="show">
      <div class="dw">
        <div class="dw-box" @click="choose('start')">
          <img src="../../assets/img/17.png" alt="" class="siteImg">
          <span class="text">{{title}}</span>
        </div>
        <div  class="dw-box" @click="choose('end')">
          <img src="../../assets/img/18.png" alt="" class="siteImg">
          <span  class="text">{{endTitle}}</span>
        </div>
      </div>
      <div class="nav" @click="go">导航</div>
      <p class="choice-text">请选择地点</p>
      <div class="dw-floor">
        <div :class="floorIndex==i?'activefloor1':'floor1'" v-for="(item,i) in bottomListB[siteIndex]['floor']" :key="i" @click="handleFloor(i)">
          {{item}}
        </div>
      </div>
      <div class="list-view" v-show="type==='start'">
        <div v-for="(item,i) in list" :key="i" :class="placeIndex==i?'opt-a-text':'opt-text'" @click="handlePlace(i,item)">
          {{item.name}}
        </div>
      </div>
      <div class="list-view" v-show="type==='end'">
        <div v-for="(item,i) in list" :key="i" :class="placeIndex1==i?'opt-a-text':'opt-text'" @click="handlePlace1(i,item)">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import headder from "../../components/ScreenH/headder";
import NavMap from "@/components/ScreenH/NavMap";


export default {
  name: "Hdetails",
  components: {
    headder,
    NavMap
  },
  data() {
    return {
      title1: '公共文化中心',
      view: '3d',
      bottomList: [
        "公共文化中心",
        "曲艺园",
        "广府园",
        "翰墨园",
        "广绣园",
        "百果园",
      ],
      siteIndex: 0,
      floorIndex: 1,
      floorNow: null,
      siteNow: null,
      active: 'view',
      bottomListB: [
        {
          name: "公共文化中心",
          floor: ["3F", "2F", "1F", "B1"],
          site: [
            [
                {name: '美术书法教室',value: 0},{name: '中型阶梯教室',value: 1},{name: '小会议室',value: 2},
                {name: '美术书法教室',value: 3},{name: '中型阶梯教室',value: 4},{name: '会议室',value: 5},
                {name: '美术书法教室',value: 6},{name: '中型阶梯教室',value: 7},{name: '小会议室',value: 8}
            ],
            [{name: 'A区',value: 0},{name: 'B区',value: 1},{name: '茶座',value: 2},{name: '美术书法教室',value: 3},{name: '小会议室',value: 4},{name: '中型阶梯教室',value: 5},
              {name: '大会议室',value: 4}, {name: '展厅',value: 6},{name: '声乐排练厅（中型）',value: 7},{name: '声乐排练厅（小型）',value: 8},{name: '书记室',value: 4},{name: '馆长室',value: 4},
              {name: '行政办公室',value: 9},{name: '休息平台',value: 10},{name: '休息平台',value: 11},{name: '数字化服务部',value: 12},{name: '舞台',value: 13},{name: '观众厅上空',value: 13},
              {name: '舞台上空',value: 13},{name: '舞台上空',value: 13}
            ],
            [
                {name: '舞台上空',value: 0},{name: '休息平台',value: 1},{name: '茶座',value: 2},
                {name: '美术书法教室',value: 3},{name: '小会议室',value: 4},{name: '中型阶梯教室',value: 5}
            ],
            [
              {name: '消防',value: 0},
              {name: '办公室2',value: 2},
              {name: '办公室1',value: 1},
              {name: '服务大厅',value: 3},
              {name: '办公室4',value: 4},
              {name: '值班室',value: 5},
              {name: '主舞台',value: 6},
              {name: '实验室剧场',value: 7},
              {name: '小型化妆室与实验室剧场',value: 8},
              {name: '庭院',value: 9},
              {name: '舞蹈戏曲排练厅(大型)',value: 11},
              {name: '舞蹈戏曲排练厅(中型)',value: 10},
              {name: '非机动车库',value: 12},
              ],
          ]
        },
        {
          name: "曲艺园",
          floor: ["3F", "2F", "1F", "B1", "B2"],
          site: []
        },
        {
          name: "广府园",
          floor: [],
          site: []
        },
        {
          name: "翰墨园",
          floor: [],
          site: []
        },
        {
          name: "广绣园",
          floor: ["2F", "1F"],
          site: []
        },
        {
          name: "百果园",
          floor: [],
          site: []
        }
      ],
      show: false,
      placeIndex: null,
      placeIndex1: null,
      title: "当前位置",
      endTitle: "位置选择",
      startVal: 0,
      endVal: null,
      DituArrayID:["WHG","QYY","GFY","HMY","GXY","BGY"],
      bottomCurrent: 0,
      floorCurrent: "2F",
      type: 'end',
    };
  },
  created() {
    this.floorNow = 3 //当前楼层---修改
    this.siteNow = 0
  },
  computed:{
    list(){
      var cur =  (this.bottomListB[this.siteIndex]).site
      return cur[this.floorIndex]
    }
  },
  methods: {
    viewChange(val){
      this.view = val
      this.$refs.navmap.setView(val)
    },
    floorClick(item, index) {
      //取消活动弹出
      this.activityShow = false;
      //所选的楼层
      this.ff = index;
      //取消弹出的小图标
      this.imgLogoNone();
      //切换楼层时清除厕所那些选中样式
      this.$refs.a.forEach((item) => {
        item.setAttribute("class", "");
      });
      // console.log(item,index);
      //切换层数
      if (/5F/.test(item)) {
        // console.log(3333);
        this.ceng = " / 5层";
      }
      if (/4F/.test(item)) {
        // console.log(3333);
        this.ceng = " / 4层";
      }
      if (/3F/.test(item)) {
        // console.log(3333);
        this.ceng = " / 3层";
      }
      if (/2F/.test(item)) {
        // console.log(3333);
        this.ceng = " / 2层";
      }
      if (/1F/.test(item)) {
        // console.log(3333);
        this.ceng = " / 1层";
      }
      if (/B1/.test(item)) {
        // console.log(3333);
        this.ceng = " / 负1层";
      }
      if (/B2/.test(item)) {
        // console.log(3333);
        this.ceng = " / 负2层";
      }
      // 楼层高亮
      this.floorCurrent = item;
      //切换图片
      this.b = this.getU(this.bottomListB[this.bottomCurrent].imgSrc);
      //地图复位
      this.DituArrayID.forEach(item=>{
          this.DituResize(item);
       })
    },
    handleSite(index){ //园区
      this.active = 'view'
      this.siteIndex = index
      this.floorIndex = null
      this.title1 = this.bottomList[index]
      this.$refs.navmap.setName(this.DituArrayID[index])
    },
    handleFloor(i){//楼层
      this.floorIndex = i;
      let floorName = (this.bottomListB[this.siteIndex]).floor[i]
      this.$refs.navmap.setFloor(floorName)
    },
    handlePlace(i,item){//开始位置
      this.title = item.name
      this.startVal = item.value
      this.placeIndex = i
    },
    handlePlace1(i,item){//结束位置
      this.endTitle = item.name
      this.endVal = item.value
      this.placeIndex1 = i
    },
    go(){
      this.$refs.navmap.getRoute({
        startVal: this.startVal,
        endVal: this.endVal
      })
      this.show = false;
    },
    choose(val){ //选地点
      this.type = val
    }
  },
};

</script>
<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100%;
  background-color: #F4F4F4;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 68px;
  .header-title{
    font-family: PingFang;
    font-weight: bold;
    font-size: 40px;
    color: #231815;
  }
}
.center{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 600px;
  .left-nav{
    width: 15%;
    padding-left: 66px;
    .activefloor{
      width: 74px;
      height: 74px;
      background-color: #8C5C36;
      font-family: PingFang;
      font-weight: bold;
      font-size: 30px;
      color: #ffffff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 34px;
    }
    .floor{
      width: 74px;
      height: 74px;
      background-color: #DCDCDC;
      font-family: PingFang;
      font-weight: bold;
      font-size: 30px;
      color: #757676;
      border-radius: 50px;
     display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 34px;
    }
  }
  .right-nav{
    width: 85%;
    float: right;
  }
}
.bottom{
  display: flex;
  justify-content: space-between;
  padding-left: 142px;
  width: 100%;
  margin: 20px 0;
  .img-list{
    width: 40%;
    height: 130px;
    display: flex;
    flex-wrap: wrap;
    .img-name{
      display: flex;
      align-items: center;
      width: 30%;
      img{
        width: 40px;
        height: 40px;
        margin-right: 11px;
      }
      span{
        font-family: PingFang;
        font-weight: 400;
        font-size: 16px;
        color: #4F1B0F;
      }
    }
  }
  .btn-list{
    width: 60%;
    height: 130px;
    display: flex;
    justify-content: flex-end;
    padding-right: 140px;
    .btn{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 56px;
      img{
        width: 80px;
        height: 80px;
        margin-bottom: 15px;
      }
      .text1{
        font-family: PingFang;
        font-weight: bold;
        font-size: 24px;
        color: #8C5C36;
      }
      .text2{
        font-family: PingFang;
        font-weight: bold;
        font-size: 24px;
        color: #878787;
      }
    }
  }
}
.footer{
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  box-shadow: 0px -10px 10px 5px #ccc;
  overflow: hidden;
  .left{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    float: left;
    img{
      margin-right: 25px;
    }
    h1{
      font-family: "Microsoft YaHei";
      font-weight: normal;
      font-size: 30px;
      color: #231815;
    }
  }
  .right{
    width: 80%;
    height: 100%;
    float: right;
    padding-right: 44px;
    .right-box{
      width: 100%;
      height: 160px;
      background-color: #8C5C36;
      border-radius: 20px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      .site{
        flex: 1;
        display: flex;
        align-items: center;
      }
      .siteA{
        flex: 1;
        display: flex;
        align-items: center;
        background-color: #DD8032;
        border-radius: 20px;
      }
      .site-name{
        height: 100px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #DCDCDC;
        font-size: 30px;
        font-family: PingFang;
        font-weight: bold;
        color: #ffffff;
      }
      .site-name-A{
        height: 100px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-family: PingFang;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
.left-box{
  width: 400px;
  height: 600px;
  padding: 16px 30px;
  background-color: #ffffff;
  position: fixed;
  right: 10px;
  top: 100px;
  border-radius: 10px;
  box-shadow: -2px 2px 10px 6px #ccc;
  overflow: hidden;
}
.dw{
  display: flex;
  flex-direction: column;
}
.siteImg{
  width: 30px;
  height: 30px;
  margin-right: 13px;
}
.text{
  color: #231815;
  font-weight: bold;
  font-family: PingFang;
  font-size: 20pt;
  padding: 6px 10px;
  background-color: #F5F4F4;
  width: 64%;
}
.dw-box{
  display: flex;
  align-items: center;
  margin-top: 24px;
}
.nav{
  position: fixed;
  line-height: 50px;
  color: #ffffff;
  background-color: #DE8032;
  border-radius: 6px;
  font-size: 20pt;
  font-family: PingFang;
  font-weight: bold;
  width: 80px;
  height: 50px;
  top: 160px;
  right: 20px;
  text-align: center;
}
.dw-floor{
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.choice-text{
  color: #878787;
  font-size: 16pt;
  margin-top: 20px;
  font-weight: bold;
  font-family: PingFang;
}
.activefloor1{
  width: 58px;
  height: 38px;
  background-color: #8B5C36;
  color: #ffffff;
  text-align: center;
  line-height: 38px;
  font-family: PingFang;
  font-size: 20pt;
  margin-right: 20px;
}
.floor1{
  width: 60px;
  height: 38px;
  background-color: #F5F4F4;
  color: #231815;
  font-family: PingFang;
  font-size: 20pt;
  text-align: center;
  line-height: 38px;
  margin-right: 20px;
}
.list-view{
  width: 100%;
  height: 320px;
  margin-top: 20px;
  overflow-y: scroll;
}
.opt-text{
  font-family: PingFang;
  font-weight: bold;
  font-size: 20px;
  color: #231815;
  padding-top: 14px;
  box-sizing: border-box;
}

::-webkit-scrollbar-track {
  background-color: #ffffff;
}


::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-button {
  background-color: #ffffff;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.opt-a-text{
  font-family: PingFang;
  font-weight: bold;
  font-size: 20px;
  color: #8B5C36;
  padding-top: 14px;
}
</style>