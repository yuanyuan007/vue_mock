<template>
  <div>
    <div class="rotating">位移</div>
    <div class="transition">过渡</div>
    <div class="animation">ha</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style scoped>
  div {
    width: 800px;
    height: 800px;
    border: 1px solid black;
    /* margin: 0 auto; */
  }
  .rotating {
    width: 200px;
    height: 50px;
    background: rgba(173, 231, 253, 0.767);
    font-size: 20px;
    /* 2D转换 */
    /* transform: rotate(60deg);旋转
    transform: translate(50px, 20px); 位移
    transform: scale(1); 放大缩小
    transform: skew(30deg, 20deg); 翻转*/
    /*   3D转换*/
    /* transform: rotateX(120deg);
    transform: rotateY(340deg);
    transform: rotateZ(120deg); */
    /* 过渡 */
    transition: width 2s;
  }
  .rotating:hover {
    width: 100px;
  }
  .transition {
    width: 100px;
    height: 100px;
    background: palegoldenrod;
    transition: width 2s, height 2s;
  }
  .transition:hover {
    width: 200px;
    height: 200px;
    transform: rotate(90deg);
  }
  .animation {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    background: peachpuff;
    position: relative;
    /* animation-name: myfirst;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running; */
    animation: myfirst 5s linear 2s infinite alternate;
  }
  @keyframes myfirst {
    0% {
      background: peachpuff;
      left: 0px;
      top: 0px;
    }
    25% {
      background: palegoldenrod;
      left: 200px;
      top: 0px;
    }
    50% {
      background: palegreen;
      left: 200px;
      top: 100px;
    }
    75% {
      background: paleturquoise;
      left: 0px;
      top: 100px;
    }
    100% {
      background: plum;
      left: 0px;
      top: 0px;
    }
  }
</style>


