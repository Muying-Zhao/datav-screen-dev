<template>
    <div class="top-header">
        <!-- <img class="logo" src="../../assets/default-avatar.jpeg" alt="logo"> -->
        <div class="logo-wrapper">
            <logo strokeWidth="10" stroke="red"></logo>
        </div>
        <div class="logo-text">
            <div class="cn-text">外卖业务数据大盘</div>
            <div class="en-text">Delivery Dverview of Business Data</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopHeader'
}
</script>

<style lang="scss" scoped>
.top-header{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(36,31,32);
    padding: 0 64px;
    box-sizing: border-box;
    .logo{
        width: 120px;
        height: 120px;
        border-radius: 100%;
    }
    .logo-wrapper{
        width: 160px;
        height: 160px;
    }
    .logo-text{
        flex: 1;
        margin-left: 40px;
        .cn-text{
            color: rgb(255,255,255);
            font-weight: bold;
            font-size: 60px;
            letter-spacing: 2px;
        }
        .en-text{
            color: rgb(255,255,255);
            font-size: 35px;
            letter-spacing: 1px;
        }
    }
}
</style>
