<template>
    <div class="sales-list">
            <base-scroll-list
              :config="config"
            ></base-scroll-list>
        </div>
</template>
<script>
import { ref,onMounted,watch } from 'vue'
export default {
    name: 'SalesList',
    props:{
        data:Array
    },
    setup(props) {
        const config = ref({})
        const update=()=>{
            const data = []
            const aligns=[]
            const headerIndexData=[]
            // 数据处理逻辑
            for (let i = 0; i < props.data.length; i++) {
                data[i]=[]
                if(i%2===0){
                    headerIndexData[i]=
                    `<div style="background:rgb(40,40,40);width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                        <div style="width:15px;height:15px;background: rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
                    </div>`
                }else{
                    headerIndexData[i]= 
                    `<div style="background:rgb(40,40,40)width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                        <div style="width:15px;height:15px;background: rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
                    </div>`

                }
                for(let j=0;j<5;j++){
                    let text=''
                    aligns.push('center')
                    switch (j) {
                        case 0:
                            text=props.data[i].order
                            break;
                        case 1:
                            text = props.data[i].shop
                            break;
                        case 2:
                            text = props.data[i].rider
                            break;
                        case 3:
                            text = props.data[i].newShop
                            break;
                        case 4:
                            text = props.data[i].avgOrder
                            break;
                        default:
                            break;
                    }
                    if(j===1 ||j===3){
                        data[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
                    }else{
                        data[i].push(`<div>${text}</div>`)
                    }
                }
            }

            config.value = {
                // 表头
                headerData: ['城市订单量', '店铺数', '接单骑手人数', '新店铺数量', '人均订单量'],
                // 表头高度
                headerHeight: 55,
                // 表头的字号
                headerFontSize:24,
                // 表头字体颜色
                headerColor: '#fff',
                // 表头背景颜色
                headerBg: 'rgb(80,80,80)',
                // 表头序号列的内容
                headerIndexContent:'',
                headerIndex: true,
                headerIndexData,
                // 
                rowNum: 10,
                // 行背景
                rowBg: ['rgb(40,40,40)', 'rgb(55,55,55)'],
                rowFontSize:24,
                rowColor: '#fff',
                // aligns: ['center', 'left', 'right'],
                aligns: ['center', 'center', 'center'],
                data, 
                aligns
            }
        }
        
        onMounted(()=>{
            update()
        })
        watch(()=> props.data,()=>{
            update()
        })
        return {
            config
        }
    }
}
</script>
<style scoped lang="scss">
.sales-list{
    width: 100%;
    height: 100%;
}
</style>