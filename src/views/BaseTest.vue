<template>
    <div style="width: 500px;height: 400px;">
        <base-scroll-list
          :config="config"
        ></base-scroll-list>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    name:'BaseTest',
    setup(){
        const config=ref({})
        const  headerData=['姓名','年龄','月薪']
        const headerStyle=[{color:'red'},{width:'100px'}]
        const headerFontSize=24
        const rowFontSize=20
        const rowStyle=[{color:'blue'}]
        const rowBg=['rgb(40,40,40)','rgb(55,55,55)']
        const aligns=['center','left','right']
        const headerColor='#fff'
        const rowColor='#000'
        const data=[]

        for(let i=0;i<10;i++){
            data.push([
                '同学'+(i+1),
                Math.floor(Math.random()*10+20),
                Math.floor(Math.random() * 10000 + 10000)])
        }

        config.value={
            headerData,
             headerStyle,
             rowStyle,
             rowBg,
             headerBg:'rgb(80,80,80)',
             headerHeight:'40',
             headerIndex:true,
             data,
             aligns,
             rowNum:10,
             headerFontSize,
             rowFontSize,
             headerColor,
             rowColor
        }
        return {
             config
        }
    }
}
</script>