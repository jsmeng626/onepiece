<template>
  <div class="container">
    <div class="intro">
      <div class="img">
        <img :src="detail.url" alt="" />
      </div>
      <div class="description">
        <h1>{{ detail.name }}<span>（日本漫画海贼王中的角色）</span></h1>
        <p>
          蒙奇·D·路飞，日本漫画《航海王》及其衍生作品中的男主角。外号“草帽”路飞，是草帽一伙、草帽大船团的船长，极恶的世代之一。橡胶果实能力者，悬赏金15亿贝里。梦想是找到传说中的One
          Piece，成为海贼王。
        </p>
        <p>
          路飞性格积极乐观，爱憎分明，宁死不屈，十分重视伙伴与朋友，对任何危险的事物都超感兴趣。和其他传统的海贼所不同的是，他并不会为了追求财富而杀戮，而是享受着身为海贼的冒险和自由。
        </p>
      </div>
    </div>
    <div class="experience">
      <h3>角色形象</h3>
      <h4>身份背景</h4>
      <p>
        19岁的青年海贼，海军英雄蒙奇·D·卡普的孙子，革命军首领蒙奇·D·龙的儿子，波特卡斯·D·艾斯、萨博的义弟，集结香波地群岛的十一超新星之一。悬赏金15亿贝里，被称作“草帽小子”
        。小时候误食了橡胶果实，所以自己获得如橡胶般自由伸缩的能力
        。梦想是找到传说中的One
        Piece，成为海贼王，他是在香克斯的启蒙下萌生这个梦想的
        。口头禅是“我是要成为海贼王的男人”。尾田提到草帽一伙如果是个大家族，那路飞就是家中的四男
        。
      </p>
      <h4>性格特点</h4>
      <p>
        路飞积极乐观，他出海不是为了钱财，而是为了享受冒险的过程，在罗格镇的断头台上即将被斩首时，在却异于常人的露出开朗的笑容，因为他早已抱有必死的觉悟
        。
        他单纯天真，是个一根筋，对新鲜事物尤其机械和新奇武器方面有强烈的好奇心，对好奇的事物眼中会产生星星。他也特别喜欢动物，具有对各种动物的匪夷所思的交流术，对各种独角仙情有独钟
        。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Persondetail',

  data() {
    return {
      detail: {}
    }
  },

  async created() {
    const id = this.$route.query.id
    const { data: res } = await this.$axios.get('/detail', { params: { id } })
    this.detail = res.data
  },

  methods: {}
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.container {
  padding: (20 / @w) (40 / @w);
  .intro {
    display: flex;
    justify-content: space-between;
    .img {
      height: (460 / @w);
      margin: (5 / @w) 0 0 (5 / @w);
      border-radius: (15 / @w);
      border: 5px solid rgb(117, 202, 255);
      box-shadow: (10 / @w) (10 / @w) (15 / @w) rgb(0 0 0 / 30%);
      img {
        width: 100%;
        height: 100%;
        border-radius: (10 / @w);
      }
    }
    .description {
      width: (600 / @w);
      padding: (20 / @w);
      margin-top: (5 / @w);
      border-radius: (10 / @w);
      box-shadow: (10 / @w) (10 / @w) (15 / @w) rgb(0 0 0 / 30%);
      background-color: #fff;
      h1 {
        font-size: (40 / @w);
        font-weight: normal;
        span {
          font-size: (20 / @w);
        }
      }
      p {
        margin-top: (30 / @w);
        font-size: (18 / @w);
        text-indent: 2em;
      }
    }
  }
  .experience {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: (20 / @w);
    height: (330 / @w);
    padding: (10 / @w);
    border-radius: (10 / @w);
    box-shadow: (10 / @w) (10 / @w) (15 / @w) rgb(0 0 0 / 30%);
    background-color: #fff;
    h3 {
      font-size: 20px;
      &::before {
        content: "";
        height: (20 / @w);
        width: (10 / @w);
        background-color: lightskyblue;
      }
    }
    p {
      text-indent: 2em;
      overflow: auto;
      font-size: (14 / @w);
      line-height: 2;
    }
  }
}
</style>
