<template>
    <div class="country-category">
        <div class="category" v-for="(item,index) in data" :key="item"
        @click="onClick(index)"
                  @mouseenter="onMouseEnter(index)"
                  @mouseleave="onMouseLeave(index)"
                  @mouseemove="onMouseEnter(index)">
            <!-- @mouseenter监听鼠标移动
                @click监听点击事件
             -->
            <div 
            class="selected"
              v-if="index===selected"
              :style="{background:color[0]}"
              
            >{{ item }}</div>
            <div class="hovered"
            v-else-if="index===hover"
            :style="{ background: color[1 ] }"
            >{{ item }}</div>
            <div v-else>{{ item }}</div>
        </div>
    </div>
</template>

<script>
import { ref ,onMounted, onUnmounted} from 'vue'
export default {
    name: 'TransformCategory',
    props: {
        data: Array,
        color: {
            type: Array,
            default() {
                return ['rgb(140, 160, 173)', 'rgb(80, 80, 80)']
            }
        }
    },
    setup(props) {
        const selected=ref(0)
        const hover=ref(-1)
        let task

        const onClick=(index)=>{
            selected.value=index
        }
        const onMouseEnter =(index)=>{
            hover.value=index
        }
        const onMouseLeave =()=>{
            hover.value = -1
        }

        const update=()=>{
            task && clearInterval(task)
            task=setInterval(()=>{
                if(selected.value+1>props.data.length-1){
                    selected.value=0
                }else{
                    selected.value+=1
                }

            },2000)
        }
        onMounted(update)
        onUnmounted(()=>task&& clearInterval(task))
        
        return {selected, onClick , onMouseEnter , onMouseLeave, hover }
    }
}
</script>

<style lang="scss" scoped>
.country-category {
    display: flex;
    width: 100%;
    height: 100%;

    .category {
        flex: 1;
        background: rgb(53, 57, 65);
        font-size: 24px;
        color: rgb(144, 160, 174);

        .hovered {
            background: rgb(80, 80, 80);
        }

        .selected {
            background: rgb(140, 160, 173);
            color: #fff;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }
}
</style>