<template>
  <view class="page flex-col">
    <view class="outer1 flex-col">
      <view class="group1 flex-col">
        <view class="section1 flex-row justify-between">
          <view class="layer1 flex-col"></view>
          <text class="txt1">开福区雨洪监测预警指挥决策系统</text>
          <view class="layer2 flex-col"></view>
        </view>
        <view class="section2 flex-col">
          <view class="main1 flex-row">
            <view class="outer2">
              <text class="word1">9:4</text>
              <text class="txt2">1</text>
            </view>
            <view class="outer3 flex-col"></view>
            <view class="outer4 flex-col"></view>
            <view class="outer5 flex-col"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="outer6 flex-col">
      <view class="group2 flex-col justify-between">
        <view class="bd1 flex-col">
          <view class="box1 flex-col justify-between">
            <view class="bd2 flex-row justify-between">
              <view class="ImageText1 flex-row justify-between">
                <view class="TextGroup1 flex-col">
                  <text class="word2">Hello！张斌宇</text>
                </view>
                <view class="section3 flex-col"></view>
              </view>
              <view class="outer7 flex-col"></view>
            </view>
            <view class="bd3 flex-row justify-between">
              <view class="bd4 flex-col">
                <view class="mod1 flex-row justify-between">
                  <view class="TextGroup2 flex-col justify-between">
                    <text class="info1">应急事件</text>
                    <text class="txt3">紧急事件发布入口</text>
                  </view>
                  <view class="block1 flex-col"></view>
                </view>
              </view>
              <view class="bd5 flex-col">
                <view class="mod2 flex-row justify-between">
                  <view class="TextGroup3 flex-col justify-between">
                    <text class="txt4">常规事件</text>
                    <text class="info2">普通事件上报入口</text>
                  </view>
                  <view class="layer3 flex-col"></view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <text class="info3">应急事件</text>
      </view>
    </view>
    <view class="outer8 flex-col">
      <view class="mod3 flex-col">
        <view class="box2 flex-row justify-between">
          <text class="info4">浏阳河隧道积水3人被困车顶</text>
          <view class="section4 flex-col"><text class="txt5">A级</text></view>
        </view>
        <view class="ImageText2 flex-row justify-between">
          <view class="section5 flex-col"></view>
          <view class="TextGroup4 flex-col">
            <text class="info5">2022-05-12&nbsp;10:12</text>
          </view>
        </view>
        <view class="ImageText3 flex-row justify-between">
          <view class="wrap1 flex-col"></view>
          <view class="TextGroup5 flex-col">
            <text class="word3">浏阳河隧道南往北方向隧道内距离出口100米处</text>
          </view>
        </view>
        <view class="box3 flex-row">
          <view
            class="mod4 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <view class="main2 flex-col" :style="{ background: item.lanhuBg1 }">
              <view v-if="item.slot1 === 1" class="layer4 flex-col">
                <text class="word4">+14</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      loopData0: [
        {
          lanhuBg1:
            'url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng722af642ca7390bda944f779ba208d8e947121b28e0c4648fb7b623fb49ce8c7) 100% no-repeat',
        },
        {
          lanhuBg1:
            'url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5e3e663cd0e153384b08108d5481471462eb6945cd1078e6bcb36311ae5b0c7a) 100% no-repeat',
        },
        {
          lanhuBg1:
            'url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbc70bbe5ff5ed3127343eaec76450b71a53dce7f26579dc44dc1917cee9d8701) 100% no-repeat',
          slot1: 1,
        },
      ],
      constants: {},
    };
  },
  methods: {},
};
</script>
<style>
/* @import './common.css'; */
@import '@/pages/home/copy/index.css';
</style>