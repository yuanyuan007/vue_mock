<template>
  <div>
    home
    <div>
      <button @click="count++">点击++</button>{{count}}
      <button @click="clickAdd+=1">点击+=</button>{{clickAdd}}
      <button @click="greet">Greet</button>
      <button @click="say('hi')">say hi</button> <!-- 括号里的内容加引号 -->
      <button @click="say('what')">say what</button>
      <button @click="warn('特殊变量$event传入表格未提交',$event)">submit</button>
      <a @click.once="once">once</a>
      <input type="checkbox" id="checkbox" v-model="check">
      <label for="checkbox">单选框：{{check}}</label>
      <br/>
      <input type="checkbox" id="0" value="0" v-model="num">
      <label for="0">0</label>
      <input type="checkbox" id="1" value="1" v-model="num">
      <label for="1">1</label>
      <input type="checkbox" id="2" value="2" v-model="num">
      <label for="2">2</label>
      <input type="checkbox" id="3" value="3" v-model="num">
      <label for="3">3</label>
      <input type="checkbox" id="4" value="4" v-model="num">
      <label for="4">4</label>
      <input type="checkbox" id="5" value="5" v-model="num">
      <label for="5">5</label>
      多选框勾选：{{num}}
      <br/>
      <select v-model="select">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      选择图片：<img :src="select" class="img" onmousedown="alert('你点击了图片')" onmouseout="alert('鼠标移出')" >
    </div>
      <input type="button" value="Click Me" onclick="alert('Clicked')"/>
      <br/>
      <input type="button" value="Click Me" onclick="alert(event.type)"/>通过event变量访问对象event.type
      <br/>
      <input type="button" value="Click Me" onclick="alert(this.value)"/>函数内部this值等于时间的目标元素
      <br/>
      <div>
      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        check: true,
        count: 0,
        clickAdd: 0,
        select: require('@/assets/background1.jpeg'),
        options: [
          { text: 'One', value: require('@/assets/background1.jpeg'), type: 'primary' },
          { text: 'Two', value: require('@/assets/background2.png'), type: 'success' },
          { text: 'Three', value: require('@/assets/background3.jpeg'), type: 'danger' },
          { text: 'four', value: require('@/assets/background4.jpg'), type: 'info' },
          { text: 'five', value: require('@/assets/background.jpg'), type: 'warning' },
        ],
        num: [],
        name: 'haha'
      }
    },
    computed: {
    },
    methods: {
      greet(event) {
        alert('hello ' + this.name + ' !')
        if(event) {
          alert(event.target.tagName)//event是原生的DOM事件，指向button
        }
      },
      say(message) {
        alert(message)
      },
      warn(message, event) {
        if(event) event.preventDefault();
        alert(message)
      },
      once(event) {
        alert('once')
      }
    }
  }
</script>
<style lang="less" scoped>
  .img {
    width: 300px;
    height: 200px;
  }
</style>