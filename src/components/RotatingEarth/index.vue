<template>
    <div class="rotating-earth">
        <vue-echarts :option="options"/>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import 'echarts-gl'
// import * as echarts from 'echarts';

const ROOT_PATH='./'
export default {
    name:'RotatingEarth',
    setup(){
         const options=ref({})
         const update=()=>{
            options.value={
                globe:{
                    // 基础纹理贴图
                    baseTexture:`${ROOT_PATH}assets/datav-gl-texture.jpg`,
                    // 背景环境贴图，也可以直接使用颜色
                    environment:`${ ROOT_PATH }assets/star-bg.jpg`, 
                    // 渐变色贴图
                    // environment:new echarts.graphic.LinearGradient(0,0,0,1,[{
                    //     offset:0,color:'#00aaff' //天空颜色
                    // },{
                    //     offset:0.7,color:'#998866' //地面颜色
                    // }, {
                    //     offset: 1, color: '#998866' //地面颜色
                    // }],false),
                    // 高度纹理贴图
                    heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`,
                    displacementScale:0.04 ,//地球顶点位置
                    shading:'realistic',
                    realisticMaterial:{
                        royghness:0.9
                    },
                    postEffect:{
                        enable:true
                    },
                    light:{
                        main:{
                            intensity:1,
                            shadow:true
                        }
                    }
                }
            }
         }
         onMounted(update)
         return {options}
    }
}
</script>
<style lang="scss" scoped>
.rotating-earth{
    width: 100%;
    height: 100%;
}
</style>