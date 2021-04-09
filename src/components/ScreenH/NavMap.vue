<template>
  <div class="con-map" id="map"></div>
</template>

<script>
var THREE = window.THREE;
import { OrbitControls } from "../../../public/three/OrbitControls";
import { pathData } from "../../../utils/path";
import { points } from "../../../utils/route";
import { datas } from "../../../utils/floorData";

export default {
  name: "NavMap",
  data() {
    return {
      labelArray: [],
      floorInfo: {},
      ObjType: {
        CUBE: "cube",
        FLOOR: "floor", //地板
        CELL: "cell", //常用的小隔间
        WALL: "wall", //墙体
        GLASS: "glass", //玻璃
        GALLERY: "gallery"//走廊
      },
      colorConst: [
        { fill: "#DD903E", stroke: "#DD903E" }, //行政区颜色
        { fill: "#EABE84", stroke: "#EABE84" }, //教学区颜色
        { fill: "#D2D2D2", stroke: "#D2D2D2" }, //其它区域颜色
        { fill: "#E9E7E7", stroke: "#E9E7E7" } //楼层底色
      ],
      data: null,
      mesh: null,
      currentSite: 0,
      endSite: 0,
      branchName: "WHG",
      floorName: "2F",
      start: '0',
      end: '',
      ani: null
    };
  },
  created() {
    this.getFloor();
  },
  methods: {
    onDocumentMouseDown(event) {
      let name = document.getElementById("map");
      event.preventDefault();
      name.addEventListener("mousemove", this.onDocumentMouseMove, false);
      name.addEventListener("mouseup", this.onDocumentMouseUp, false);
    },
    onDocumentMouseMove(event) {
      var movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      this.camera.x -= movementX * 0.01;
      this.scene.x -= movementX * 0.01;
      this.camera.z -= movementY * 0.01;
      this.scene.z -= movementY * 0.01;
      // camera.position.set(cameraX, cameraY, cameraZ);
      this.camera.lookAt(this.scene.x, 0, this.scene.z);
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    },
    onDocumentMouseUp() {
      let name = document.getElementById("map");
      name.removeEventListener("mousemove", this.onDocumentMouseMove);
      name.removeEventListener("mouseup", this.onDocumentMouseUp);
    },
    getFloor() {
      let data1 = datas[this.branchName];
      let data = data1[this.floorName];
      if (!data) {
        return true;
      }
      this.labelArray = data.labelArray;
      this.floorInfo = data.floorInfo;
    },

    /**初始化场景**/
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#F5F4F4");
      // const axesHelper = new THREE.AxesHelper(50);
      // this.scene.add(axesHelper);
    },
    /**
     * 初始化相机
     * */
    initCamera() {
      let name = document.getElementById("map");
      this.camera = new THREE.PerspectiveCamera(
        45,
        name.offsetWidth / name.offsetHeight,
        0.1,
        1000
      );
      this.camera.lookAt(new THREE.Vector3(-2.81, 0, -33.26));
      this.camera.position.set(-2.81, 180.44, -33.26);
    },
    /**
     * 初始化光照
     * */
    initLight() {
      this.scene.add(new THREE.AmbientLight("#F5F4F4"));
      let spotLight = new THREE.SpotLight();
      spotLight.color = new THREE.Color("#E9E7E7");
      spotLight.castShadow = true;
      spotLight.position.set(-100, 200, -100);
      // 光的强度 默认值为1
      spotLight.intensity = 0.5;
      // 从发光点发出的距离，光的亮度，会随着距离的远近线性衰减
      spotLight.distance = 300;
      // 光色散角度，默认是 Math.PI * 2
      spotLight.angle = 1;
      // 光影的减弱程度，默认值为0， 取值范围 0 -- 1之间
      spotLight.penumbra = 0.5;
      // 光在距离上的量值, 和光的强度类似（衰减指数）
      spotLight.decay = 0.8;

      // 设置阴影分辨率
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      // 投影近点 --> 从距离光源的哪一才产生阴影
      spotLight.shadow.camera.near = 0.5;
      // 投影原点 --> 到光源的哪一点位置不产生阴影
      spotLight.shadow.camera.far = 0;
      // 投影视场
      spotLight.shadow.camera.fov = 45;
      this.scene.add(spotLight);
    },
    onWindowResize() {
      let name = document.getElementById("map");
      this.camera.aspect = name.offsetWidth / name.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(name.offsetWidth, name.offsetHeight);
    },
    /**
     * 初始化渲染
     * */
    initRender() {
      let name = document.getElementById("map");
      let renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(2); //window.devicePixelRatio
      renderer.setSize(name.offsetWidth, name.offsetHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer = renderer;
      document.getElementById("map").appendChild(renderer.domElement);
    },
    /**
     * 初始化控制器
     * */
    initControl() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //用户交互
      //设置相机的角度范围
      this.controls.minPolarAngle = 0.2;
      this.controls.maxPolarAngle = Math.PI * 0.4;
      //设置相机距离原点的最远距离
      this.controls.minDistance = 0;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 200;
      this.controls.target.set(-3.0, 0, -60.268);
      // controls.enablePan = false; //禁止右键拖拽
      // this.controls.minZoom = 0;
      // this.controls.maxZoom = 2;
      // this.controls.minAzimuthAngle = -Math.PI * (100 / 180);
      // this.controls.maxAzimuthAngle = Math.PI * (100 / 180);
    },
    setView(val) {
      if (val === "2d") {
        this.controls.maxPolarAngle = 0;
        this.controls.mouseButtons = {
          LEFT: THREE.MOUSE.RIGHT,
          RIGHT: THREE.MOUSE.LEFT
        }
      } else {
        this.controls.maxPolarAngle = Math.PI * 0.2;
        this.controls.mouseButtons = {
          LEFT: THREE.MOUSE.LEFT,
          RIGHT: THREE.MOUSE.RIGHT
        }
      }
    },

    //初始化一些必要的组
    initGroup() {
      let floorGroup = new THREE.Object3D();
      this.floorGroup = floorGroup;
      this.scene.add(floorGroup);

      let labelGroup = new THREE.Object3D();
      this.labelGroup = labelGroup;
      this.scene.add(labelGroup);

      let arrowGroup = new THREE.Object3D();
      this.arrowGroup = arrowGroup;
      this.scene.add(arrowGroup);
    },

    addLabel() {
      for (var i = 0; i < this.labelArray.length; i++) {
        this.addLabelSprite(
          this.labelArray[i].text,
          13,
          this.labelArray[i].position
        );
      }
    },
    //使用sprite制作标注
    addLabelSprite(message, fontsize, position) {
      var canvas = this.generateCanvas(message, position);
      if (canvas) {
        this.makeCanvasSprite(canvas, position);
      }
    },

    //根据文字生产canvas
    generateCanvas(text, position) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      if (text.startsWith("img", 0)) {
        var text = text.substring(4);
        var texture = new THREE.TextureLoader().load(text);
        var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.x = position[0];
        sprite.position.y = position[1];
        sprite.position.z = position[2];
        texture.needsUpdate = true;
        sprite.scale.set(6, 6, 6);
        this.container.add(sprite);
      } else {
        context.font = "60px Microsoft YaHei";
        canvas.width = context.measureText(text).width; //根据文字内容获取宽度
        canvas.height = 58; // fontsize * 1.5
        context.beginPath();
        context.font = "60px Microsoft YaHei";
        context.fillStyle = "#222";
        context.fillText(text, 0, 50);
        context.fill();
        context.stroke();
        return canvas;
      }
    },
    //根据canvas图形制作sprite
    makeCanvasSprite(canvas, position) {
      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        depthWrite: false
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 0;
      sprite.center = new THREE.Vector2(0.5, 0);
      sprite.position.x = position[0];
      sprite.position.y = position[1];
      sprite.position.z = position[2];
      //sprite.visible = false;
      texture.needsUpdate = true;
      this.labelGroup.add(sprite);
    },
    //初始化楼板
    initFloor() {
      this.loadFloor(this.floorInfo);
      this.load();
      this.addLabel();
    },
    //初始化楼层数据
    loadFloor(floor) {
      if (!this.floorGroup) {
        this.floorGroup = new THREE.Object3D();
        this.scene.add(this.floorGroup);
      }
      this.container = this.floorGroup; //存放楼层元素的容器
      this.data = floor;
    },

    //加载楼层
    load() {
      var floor = this.data;
      var buildingId = floor.buildingId,
        buildingName = floor.buildingName;
      var buidlingItem = floor.buildingItem;
      for (var i = 0; i < buidlingItem.length; i++) {
        var item = buidlingItem[i];
        var type = item.type;
        var points = item.points;
        var name = item.name;
        var pntNum = item.routePoint;
        var colorIndex = item.color;
        switch (type) {
          case this.ObjType.CELL:
            this.addCell(points, 6, colorIndex, name, pntNum);
            break;
          case this.ObjType.FLOOR:
            this.addFloor(points, 3);
            break;
          case this.ObjType.GALLERY:
            this.addGallery(points, 3.1);
            break;
        }
      }
    },

    addGallery(points, height) {
      var geometry = this.getGeometry(points, height);
      geometry.computeFaceNormals(); //计算法向量
      var material = new THREE.MeshLambertMaterial({
        color: "#D2D2D2",
        side: THREE.DoubleSide
      }); //MeshLambertMaterial
      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      this.container.add(mesh);
    },

    /*
     *   创建地板
     * */
    addFloor(points, height) {
      var geometry = this.getGeometry(points, height);
      geometry.computeFaceNormals(); //计算法向量
      var material = new THREE.MeshLambertMaterial({
        color: "#E9E7E7",
        side: THREE.DoubleSide
      }); //MeshLambertMaterial
      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      this.container.add(mesh); //添加填充
    },

    /*
     *   创建不规则的小室
     * */
    addCell(points, height, colorIndex, name, pntNum) {
      var geometry = this.getGeometry(points, height);
      geometry.computeFaceNormals(); //计算法向量
      var material = new THREE.MeshLambertMaterial({
        color: this.colorConst[colorIndex].fill,
        side: THREE.DoubleSide
      }); //受光照影响
      var mesh = new THREE.Mesh(geometry, material);
      mesh.cellName = name;
      if (pntNum != undefined) {
        mesh.pointNum = pntNum;
      }
      this.container.add(mesh); //添加填充

      var lineMaterial = new THREE.LineBasicMaterial({
        color: this.colorConst[colorIndex].stroke,
        linecap: "square" //'butt', 'round' 和 'square'
      });
      var lineGeometry = this.getBorderGeometry(points, height);
      var line = new THREE.Line(lineGeometry, lineMaterial);
      this.container.add(line);
    },

    getGeometry(points, height) {
      if (points.length < 3) {
        console.log("至少需要三个点来创建盒子");
        return;
      }
      var topPoints = [];
      for (var i = 0; i < points.length; i++) {
        var vertice = points[i];
        topPoints.push([vertice[0], vertice[1] + height, vertice[2]]);
      }
      var totalPoints = points.concat(topPoints);
      var vertices = [];
      for (var i = 0; i < totalPoints.length; i++) {
        vertices.push(
          new THREE.Vector3(
            totalPoints[i][0],
            totalPoints[i][1],
            totalPoints[i][2]
          )
        ); //设置xyz三个向量
      }
      var length = points.length;
      var faces = [];
      for (var j = 0; j < length; j++) {
        //侧面生成三角形
        if (j != length - 1) {
          faces.push(new THREE.Face3(j, j + 1, length + j + 1));
          faces.push(new THREE.Face3(length + j + 1, length + j, j));
        } else {
          faces.push(new THREE.Face3(j, 0, length));
          faces.push(new THREE.Face3(length, length + j, j));
        }
      }
      var data = [];
      for (var i = 0; i < length; i++) {
        data.push(points[i][0], points[i][2]);
      }
      var triangles = Earcut.triangulate(data);
      if (triangles && triangles.length != 0) {
        for (var i = 0; i < triangles.length; i++) {
          var tlength = triangles.length;
          if (i % 3 == 0 && i < tlength - 2) {
            faces.push(
              new THREE.Face3(triangles[i], triangles[i + 1], triangles[i + 2])
            ); //底部的三角面
            faces.push(
              new THREE.Face3(
                triangles[i] + length,
                triangles[i + 1] + length,
                triangles[i + 2] + length
              )
            ); //顶部的三角面
          }
        }
      }
      var geometry = new THREE.Geometry();
      geometry.vertices = vertices;
      geometry.faces = faces;
      return geometry;
    },

    getBorderGeometry(points, height) {
      var geometry = new THREE.Geometry();
      var topPoints = [];
      for (var i = 0; i < points.length; i++) {
        var vertice = points[i];
        topPoints.push([vertice[0], vertice[1] + height, vertice[2]]);
      }
      for (var i = 0; i < topPoints.length; i++) {
        var topPoint = topPoints[i];
        geometry.vertices.push(
          new THREE.Vector3(topPoint[0], topPoint[1], topPoint[2])
        );
        if (i == topPoints.length - 1) {
          geometry.vertices.push(
            new THREE.Vector3(topPoints[0][0], topPoints[0][1], topPoints[0][2])
          );
        }
      }
      return geometry;
    },

    //清除楼层
    clear() {
      this.scene.remove(this.container);
      this.container = null;
      this.floorGroup = null;
    },

    updateLabel() {
      var labelSprites = this.labelGroup ? this.labelGroup.children : [];
      for (var i = 0; i < labelSprites.length; i++) {
        var sprite = labelSprites[i];
        var v = new THREE.Vector3();
        var scale_factor = 3;
        sprite.scale.x = sprite.scale.y =
          v.subVectors(sprite.position, this.camera.position).length() /
          scale_factor;
      }
    },

    //更新文字sprite标注
    updateLabelSprite() {
      var sprites = this.labelGroup ? this.labelGroup.children : [];
      if (sprites.length == 0) return;
      for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        sprite.visible = true;
      }

      for (var i = 0; i < sprites.length; i++) {
        var compareSprite = sprites[i];
        var canvas = compareSprite.material.map.image;
        if (canvas) {
          var position = compareSprite.position;
          var scale = this.getPoiScale(position, {
            w: canvas.width,
            h: canvas.height
          });
          compareSprite.scale.set(scale[0] / 4, scale[1] / 4, 1.0);
          // if(compareSprite.visible){		//true
          //     for(var j=i+1;j<sprites.length;j++){
          //         var sprite = sprites[j];
          //         if(isPOILabelRect(compareSprite,sprite)){
          //             sprite.visible = false;
          //         }
          //     }
          // }
        }
      }
    },
    getPoiScale(position, poiRect) {
      if (!position) return;
      var distance = this.camera.position.distanceTo(position); //相机和标注点的距离
      var top = Math.tan(((this.camera.fov / 2) * Math.PI) / 180) * distance; //camera.fov 相机的拍摄距离
      var meterPerPixel = (2 * top) / window.innerHeight;
      var scaleX = poiRect.w * meterPerPixel;
      var scaleY = poiRect.h * meterPerPixel;
      return [scaleX, scaleY, 1.0];
    },

    //three世界坐标转为屏幕坐标
    toScreenPos(position, camera) {
      var worldVector = new THREE.Vector3(
        position[0],
        position[1],
        position[2]
      );
      var standardVector = worldVector.project(camera); //世界坐标转标准设备坐标
      var a = window.innerWidth / 2;
      var b = window.innerHeight / 2;
      var x = Math.round(standardVector.x * a + a); //标准设备坐标转屏幕坐标
      var y = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标
      return {
        x: x,
        y: y
      };
    },

    init() {
      this.initScene();
      this.initCamera();
      this.initRender();
      this.initControl();
      this.initLight();
      this.initGroup();
      this.initFloor();

      // document.addEventListener('click', onDocumentMouseClick);
    },

    animate() {
      this.ani = requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.updateLabelSprite();
      TWEEN.update();
    },

    getRoute(route) {

      if(route.startVal == route.endVal){
        return this.$message.warning('已在当前位置')
      }
      if (this.currentRoute) {
        this.scene.remove(this.currentRoute);
      }
      this.currentSite = route.startVal;
      this.endSite = route.endVal;
      let start = route.startVal;
      let end = route.endVal;
      let data = pathData[this.branchName][this.floorName]; //根据地点调整层数
      let val = start + "-" + end;
      let path = data[val],
        coords = [];
      // var result = searchPath(start, end, matrix);
      // console.log(result)
      // if(result){
      //     var distance = result.distance;//距离
      //     var path = result.path;//节点
      //     if(path.length > 0){
      //         var coords = [];
      //         for(var i=0;i<path.length;i++){
      //             var position = points[path[i]].position;
      //             coords.push([position[0],position[2]]);
      //         }
      //         console.log(coords)
      //         addMeshLine(coords);
      //         addRouteArrow(coords);
      //     }
      //     document.getElementById("routeResult").innerHTML = "从节点"+start+"到节点"+end+",最短距离为"+distance+",经过的节点为:"+path.join(",");
      // }
      this.getCurrentSite();
      let points1 = points[this.branchName][this.floorName]
      if (path.length > 0) {
        for (var i = 0; i < path.length; i++) {
          var position = points1[path[i]].position;
          coords.push([position[0], position[2]]);
        }
        this.addMeshLine(coords);
        this.addRouteArrow(coords);
      }
      this.getEndSite();
    },

    addMeshLine(lineCoords) {
      if (this.meshline) {
        this.scene.remove(this.meshline);
      }
      let detailCoords = new lineBuffer({
        coords: lineCoords,
        radius: 0.5
      }).getBufferCoords();
      var vertices = [],
        faces = [],
        data = [];
      for (var i = 0; i < detailCoords.length; i++) {
        vertices.push(
          new THREE.Vector3(detailCoords[i][0], 4, detailCoords[i][1])
        );
        data.push(detailCoords[i][0], detailCoords[i][1]);
      }
      var triangles = window.Earcut.triangulate(data);
      if (triangles && triangles.length != 0) {
        for (var i = 0; i < triangles.length; i++) {
          var tlength = triangles.length;
          if (i % 3 == 0 && i < tlength - 2) {
            faces.push(
              new THREE.Face3(triangles[i], triangles[i + 1], triangles[i + 2])
            ); //底部的三角面
          }
        }
      }
      var geometry = new THREE.Geometry();
      geometry.vertices = vertices;
      geometry.faces = faces;
      let material = new THREE.MeshBasicMaterial({
        color: 0x008800,
        side: THREE.DoubleSide
      });
      this.meshline = new THREE.Mesh(geometry, material);
      this.scene.add(this.meshline);
    },
    addRouteArrow(coords) {
      if (this.routeArrow) {
        this.scene.remove(this.routeArrow);
      }
      var texture = new THREE.TextureLoader().load("/images/pointer.png");
      var geometry = new THREE.PlaneGeometry(4, 4);
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false
      });
      this.routeArrow = new THREE.Mesh(geometry, material);
      this.routeArrow.position.x = coords[0][0];
      this.routeArrow.position.y = 4;
      this.routeArrow.position.z = coords[0][1];
      this.routeArrow.rotation.x = Math.PI / 2;
      this.scene.add(this.routeArrow);
      this.startAnimation(coords, 0);
    },

    /**
     * 开始动画
     * @param {String} type 动画类型，分为人物旋转动画rotate和人物移动动画run
     * @param {String} index 到达的索引号
     * */
    startAnimation(pointArray, index) {
      if (!pointArray[index + 1]) {
        return;
      }
      var curPoint = pointArray[index];
      var nextPoint = pointArray[index + 1];
      new window.TWEEN.Tween(this.routeArrow.position)
        .to(
          {
            //动画过渡 y 1.8
            x: nextPoint[0],
            y: 3,
            z: nextPoint[1]
          },
          3000
        )
        .onUpdate(() => {
          var rotation = -Math.atan2(
            nextPoint[0] - curPoint[0],
            nextPoint[1] - curPoint[1]
          );
          this.routeArrow.rotation.z = rotation; //因为模型本身角度原因，需要调整+Math.PI/2
        })
        .onComplete(() => {
          index++;
          this.startAnimation(pointArray, index);
        })
        .start();
    },
    /*
     * 获取当前地点
     * */
    getCurrentSite() { //当前位置
      let p = points[this.branchName][this.floorName]
      let point = p[this.currentSite];
      if (this.currentRoute) {
        this.container.remove(this.currentRoute);
      }
      var texture = new THREE.TextureLoader().load("/images/17.png");
      var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      this.currentRoute = new THREE.Sprite(spriteMaterial);
      this.currentRoute.position.x = point.position[0];
      this.currentRoute.position.y = 8;
      this.currentRoute.position.z = point.position[2];
      texture.needsUpdate = true;
      this.currentRoute.scale.set(6, 6, 6);
      this.container.add(this.currentRoute);
    },
    getEndSite() { // 终点
      let p = points[this.branchName][this.floorName]
      let point = p[this.endSite];
      if (this.endRoute) {
        this.container.remove(this.endRoute);
      }

      var texture = new THREE.TextureLoader().load("/images/18.png");
      var geometry = new THREE.SpriteMaterial({ map: texture });
      this.endRoute = new THREE.Sprite(geometry);
      this.endRoute.position.x = point.position[0];
      this.endRoute.position.y = 8;
      this.endRoute.position.z = point.position[2];
      texture.needsUpdate = true;
      this.endRoute.scale.set(6, 6, 6);
      // this.endRoute.rotation.x = -1.2;
      this.container.add(this.endRoute);
    },
    setName(x) {
      this.branchName = x;
      this.scene.remove(this.floorGroup);
      this.scene.remove(this.labelGroup);
      this.scene.remove(this.arrowGroup);
      this.scene.remove(this.currentRoute);
      this.scene.remove(this.endRoute);
      this.scene.remove(this.meshline);
      this.scene.remove(this.routeArrow);
    },
    setFloor(x) {//楼层
      this.floorName = x;
      this.scene.remove(this.floorGroup);
      this.scene.remove(this.labelGroup);
      this.scene.remove(this.arrowGroup);
      this.scene.remove(this.currentRoute);
      this.scene.remove(this.endRoute);
      this.scene.remove(this.meshline);
      this.scene.remove(this.routeArrow);
      let hasData = this.getFloor();
      if (hasData) {
        return this.$message.warning("暂无当前楼层信息");
      }
      this.initGroup();
      this.initFloor();
    },
    onDocumentMouseClick(event) {//点击选点
      event.preventDefault();
      var vector = new THREE.Vector3(); //三维坐标对象
      vector.set(
        (event.offsetX / document.getElementById('map').offsetWidth) * 2 - 1,
        -(event.offsetY / document.getElementById('map').offsetHeight) * 2 + 1,
        0.5
      );
      vector.unproject(this.camera);
      var raycaster = new THREE.Raycaster(
        this.camera.position,
        vector.sub(this.camera.position).normalize()
      );
      var intersects = raycaster.intersectObjects(
        this.floorGroup instanceof THREE.Object3D
          ? this.floorGroup.children
          : []
      );
      if (intersects.length > 0 && intersects[0].object instanceof THREE.Mesh) {
        //有时先选到线,选不中
        var mesh = intersects[0].object;
        var pointNum = mesh.pointNum;
        if (pointNum != undefined) {
          console.log(pointNum)
          // var start = document.getElementById("startIndex").value;
          // let end = document.getElementById("endIndex").value;
          // if (start != "" && end != "") {
          //   document.getElementById("startIndex").value = pointNum;
          //   document.getElementById("endIndex").value = "";
          // } else {
          //   if (start == "") {
          //     document.getElementById("startIndex").value = pointNum;
          //   } else {
          //     document.getElementById("endIndex").value = pointNum;
          //   }
          // }
        }
      }
    },
    reset(){//复位
      this.branchName = "WHG";
      this.floorName = "B1";
      this.setFloor(this.floorName)
    },
    setActivity(i,j){
      this.branchName = i
      this.floorName = j
      let path = pathData[i][j]
      this.getActivityRoute(path["10001001"])

    },
    getActivityRoute(path1) {//活动路线
      let end = path1.length-1
      this.endSite = path1[end];
      if (this.currentRoute) {
        this.scene.remove(this.currentRoute);
      }
      let coords = []
      let points1 = points[this.branchName][this.floorName]
      if (path1.length > 0) {
        for (var i = 0; i < path1.length; i++) {
          var position = points1[path1[i]].position;
          coords.push([position[0], position[2]]);
        }
        this.addMeshLine(coords);
        this.addRouteArrow(coords);
      }
      this.getEndSite();
    },
  },
  beforeDestroy() {
    this.renderer.forceContextLoss()
    this.renderer = null
    this.camera = null;
    this.controls = null;
    this.scene = null;
    cancelAnimationFrame(this.ani);
    window.removeEventListener('resize',this.onWindowResize)
  },
  mounted() {
    this.scene = null;
    this.controls = null;
    this.camera = null;
    this.renderer = null;
    this.light = null;
    this.floorGroup = null;
    this.labelGroup = null;
    this.arrowGroup = null;
    this.container = null;
    this.meshline = null;
    this.routeArrow = null;
    this.currentRoute = null;
    this.endRoute = null;
    this.init();
    this.animate();
    window.addEventListener("resize", this.onWindowResize, false);
    document.getElementById('map').addEventListener("click", this.onDocumentMouseClick,false);
    this.getCurrentSite();
  }
};
</script>

<style scoped>
.con-map {
  width: 100%;
  height: 100%;
}
</style>
