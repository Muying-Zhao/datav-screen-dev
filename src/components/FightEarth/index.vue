<template>
    <div class="flight-earth">
        <vue-echarts :option="options" />
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import 'echarts-gl'
const ROOT_PATH='./'
export default {
    name: 'FightEarth',
    setup() {
        const options = ref({})
        const update = () => {
            // const ROOT_PATH='./'
            // myChart.setOption改成options.value=,var改成const
            // 找到该网址。然后使用fetch替换getJson里内容
            // 该json文件不允许跨域访问，所以要么上传自己的服务器中或本地加载读取文件
            fetch('http://www.youbaobao.xyz/datav-res/datav/flights.json')
                .then(response => response.json())
                .then(data => {
                    const airports = data.airports.map(function (item) {
                        return {
                            coord: [item[3], item[4]]
                        };
                    });
                    function getAirportCoord(idx) {
                        return [data.airports[idx][3], data.airports[idx][4]];
                    }
                    const routesGroupByAirline = {};
                    data.routes.forEach(function (route) {
                        const airline = data.airlines[route[0]];
                        const airlineName = airline[0];
                        if (!routesGroupByAirline[airlineName]) {
                            routesGroupByAirline[airlineName] = [];
                        }
                        routesGroupByAirline[airlineName].push(route);
                    });
                    const pointsData = [];
                    data.routes.forEach(function (airline) {
                        pointsData.push(getAirportCoord(airline[1]));
                        pointsData.push(getAirportCoord(airline[2]));
                    });
                    const series = data.airlines
                        .map(function (airline) {
                            const airlineName = airline[0];
                            const routes = routesGroupByAirline[airlineName];
                            if (!routes) {
                                return null;
                            }
                            return {
                                type: 'lines3D',
                                name: airlineName,
                                effect: {
                                    show: true,
                                    trailWidth: 2,
                                    trailLength: 0.15,
                                    trailOpacity: 1,
                                    trailColor: 'rgb(30, 30, 60)'
                                },
                                lineStyle: {
                                    width: 1,
                                    color: 'rgb(50, 50, 150)',
                                    // color: 'rgb(118, 233, 241)',
                                    opacity: 0.1
                                },
                                blendMode: 'lighter',
                                data: routes.map(function (item) {
                                    return [airports[item[1]].coord, airports[item[2]].coord];
                                })
                            };
                        })
                        .filter(function (series) {
                            return !!series;
                        });
                    series.push({
                        type: 'scatter3D',
                        coordinateSystem: 'globe',
                        blendMode: 'lighter',
                        symbolSize: 2,
                        itemStyle: {
                            color: 'rgb(50, 50, 150)',
                            opacity: 0.2
                        },
                        data: pointsData
                    });
                    options.value=({
                        legend: {
                            selectedMode: 'single',
                            left: 'left',
                            data: Object.keys(routesGroupByAirline),
                            orient: 'vertical',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        globe: {
                            environment: `${ROOT_PATH}assets/star-bg.jpg`,
                            baseTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`,
                            heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`,
                            displacementScale: 0.1,
                            displacementQuality: 'high',
                            baseColor: '#fff',
                            shading: 'realistic',
                            realisticMaterial: {
                                roughness: 0.2,
                                metalness: 0
                            },
                            postEffect: {
                                enable: true,
                                depthOfField: {
                                    enable: false,
                                    focalDistance: 150
                                }
                            },
                            temporalSuperSampling: {
                                enable: true
                            },
                            light: {
                                ambient: {
                                    intensity: 0
                                },
                                main: {
                                    intensity: 5,
                                    shadow: true
                                },
                                ambientCubemap: {
                                    texture:  `${ROOT_PATH}assets/env.webp`,
                                    exposure: 1,
                                    diffuseIntensity: 0.5,
                                    specularIntensity: 2
                                }
                            },
                            viewControl: {
                                autoRotate: false
                            },
                            silent: true
                        },
                        series: series
                    });
                    window.addEventListener('keydown', function () {
                        series.forEach(function (series, idx) {
                            myChart.dispatchAction({
                                type: 'lines3DToggleEffect',
                                seriesIndex: idx
                            });
                        });
                    });
                })
        }
        onMounted(update)
        return { options }
    }
}
</script>
<style lang="scss" scoped>
.flight-earth {
    width: 100%;
    height: 100%;
}
</style>