<template>
    <div style="width:100%;height:100%;">
        <vue-echarts :option="options" />
    </div>
</template>
<script>
import { ref, onMounted ,onUnmounted} from 'vue'
// import echarts from "echarts" 视版本而定
import * as echarts from "echarts"
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'JiangsuMapWarning',
    setup() {
        const options = ref({})
        let timer=null
        const update = () => {
            fetch('https://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
                .then(response => response.json())
                .then(data => {
                    // console.log(data,'data')
                    // 获取城市数据
                    const center = []
                    data.features.forEach(item => {
                        if (item.properties) {
                            center.push({
                               key:item.properties.name,
                                value:item.properties.center
                            })
                        }
                    })
                    console.log(center, 'center')
                    echarts.registerMap('jiangsu', data)
                    options.value = {
                        visualMap:{
                            show:true,
                            max:100,
                            seriesIndex:[0],
                            // 色泽范围
                            inRange:{
                                color:['#a5dcf4','#006edd']
                            }
                        },
                        geo: [{
                            map: 'jiangsu', //使用自定义地图
                            zoom: 2, //默认显示级别
                            roam: false,// 启动鼠标滚轮地图缩放功能
                            // 控制最大和最小缩放比例
                            scaleLimit: {
                                min: 0,
                                max: 3
                            },
                            itemStyle: {
                                areaColor: '#013c62',
                                shadowColor: '#013062',
                                shadowBlur: 20,
                                shadowOffsetX: -5,
                                shadowOffsetY: 10,
                            }
                        }],
                        series: [{
                            type: 'map',
                            mapType: 'jiangsu',
                            zoom: 2,
                             roam: false,
                            label: {
                                show: true,
                                color: '#fff',
                                emphasis: {
                                    color: '#fff',
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#2980b9',
                                    borderWidth: 1,
                                    areaColor: '#12235c'
                                },
                                emphasis: {
                                    areaColor:'#fa8c16',
                                    borderWidth:0
                                }
                            },
                            data:center.map(centerItem=>{
                                // const key =Object.keys(centerItem)[0]
                                const value= Math.random() * 100 //人口数(单位：万)
                                console.log(centerItem.key, value)
                                return {
                                    name: centerItem.key,
                                    value
                                }
                            })
                        },
                        // { value: center[0].value, city: center[0].key }
                        {
                            type:'effectScatter',
                            data:[],
                            coordinateSystem:'geo',
                            symbolSize:14,
                            itemStyle:{
                                color:'#feae21'
                            },
                            label:{
                                normal:{
                                    position:'top', //inside
                                    show:true,
                                    formatter:function (params) {
                                        console.log(params,'params')
                                        return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                                    },
                                    backgroundColor:'rgba(254,174,37,.8)',
                                    padding:[0,0],
                                    borderRadius:3,
                                    lineHeight:32,
                                    color:'#f7fafb',
                                    rich:{
                                        title:{
                                            padding:[0,10,10,10],
                                            color:'#fff'
                                        },
                                        content: {
                                            padding: [ 10, 10,0, 10],
                                            color: 'red'
                                        }
                                    }
                                },
                                emphasis:{
                                    show: true,
                                }
                            }
                        }, {
                            type: 'effectScatter',
                            data: [],
                            coordinateSystem: 'geo',
                            symbolSize: 14,
                            itemStyle: {
                                color: '#e93f42'
                            },
                            label: {
                                normal: {
                                    position: 'top', //inside
                                    show: true,
                                    formatter: function (params) {
                                        console.log(params, 'params')
                                        return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                                    },
                                    backgroundColor: 'rgba(233,63,66,.9)',
                                    padding: [0, 0],
                                    borderRadius: 3,
                                    lineHeight: 32,
                                    color: '#fff',
                                    rich: {
                                        title: {
                                            padding: [0, 10, 10, 10],
                                            color: '#fff'
                                        },
                                        content: {
                                            padding: [10, 10, 0, 10],
                                            color: '#fff'
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                }
                            }
                        }, {
                            type: 'effectScatter',
                            data: [],
                            coordinateSystem: 'geo',
                            symbolSize: 14,
                            itemStyle: {
                                color: '#08baec'
                            },
                            label: {
                                normal: {
                                    position: 'top', //inside
                                    show: true,
                                    formatter: function (params) {
                                        console.log(params, 'params')
                                        return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                                    },
                                    backgroundColor: 'rgba(8,186,236,.9)',
                                    padding: [0, 0],
                                    borderRadius: 3,
                                    lineHeight: 32,
                                    color: '#fff',
                                    rich: {
                                        title: {
                                            padding: [0, 10, 10, 10],
                                            color: '#fff'
                                        },
                                        content: {
                                            padding: [10, 10, 0, 10],
                                            color: '#fff'
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                }
                            }
                        }]
                    }

                    // 测试，随机展示事件信息
                    timer=setInterval(()=>{
                        const _options= cloneDeep(options.value)
                        // 初始化数据
                        for(let i=1;i<4;i++){
                            _options.series[i].data=[]
                        }
                        // 生成城市随机数
                        const cityLength= center.length
                        const cityIndex=Math.floor(Math.random()* cityLength)
                        const eventIndex=Math.floor(Math.random() * 3)+1
                        _options.series[eventIndex].data=[{
                            city:center[cityIndex].key,
                            value:center[cityIndex].value
                        }]
                        options.value=_options
                    },2000)
                })
        }
        onMounted(update)
        onUnmounted(()=>timer&&clearInterval(timer))
        return {
            options
        }
    }
}
</script>
<style lang="scss" scoped></style>