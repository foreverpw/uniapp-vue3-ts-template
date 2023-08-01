<template>
  <view class="content">
    <page-title />
    <view class="flex w-80 hair">
      <view class="text-base px-8 py-0.5 rounded-sm bg-success">rerr</view>
      <view class="basis-2/3 ">sser</view>
    </view>
    <image class="logo" src="/static/logo.png" />
    <navigator url="/pages/login/index" class="text-area">
      <text class="title">{{ title }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello');
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
.hair{
  width:500rpx;
  margin:20px;
  @include hairline-bottom();
  color:theme('colors.primary');
}
.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
