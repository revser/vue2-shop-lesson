<template>
    <div>
      <body>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <div class="accessory-result-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby" @click.stop="showFilterPop">筛选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter" id="filter" v-bind:class="{'filterby-show':overFlag}">
              <dl class="filter-price">
                <dt>价格区间:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"  v-bind:class="{'cur': priceChecked=='all'}">选择价格</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceChecked==index}">￥ {{item.startPrice}} - {{item.endPrice}} 元</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
      </body>
    </div>

</template>

<script>
    import './../assets/css/base.css'
    import  './../assets/css/goods-list.css'
    import  NavHeader from './../components/NavHeader'
    import  NavBread from './../components/NavBread'
    import  NavFooter from './../components/NavFooter'
    import  Axios from 'axios'




    export default {
        name: "GoodsList2",
        data() {
          return {
            goodsList:[],
            priceFilter:[
              {
                startPrice:'0.00',
                endPrice:'100.00'
              },
              {
                startPrice:'100.00',
                endPrice:'500.00'
              },
              {
                startPrice:'500.00',
                endPrice:'1000.00'
              },
              {
                startPrice:'1000.00',
                endPrice:'2000.00'
              },
              {
                startPrice:'2000.00',
                endPrice:'3000.00'
              },
              {
                startPrice:'3000.00',
                endPrice:'6000.00'
              },
            ],
            priceChecked:"all",
            overFlag:false
          }
        },
        components: {
          NavHeader,
          NavBread,
          NavFooter
        },
        // mounted:()=>{
        //   this.a.methods.getGoodsList()//这样可以
        //   this.test();
        //   this.getGoodsList();
        // },
        mounted() {
          console.log(this)
          this.getGoodsList()
        },
        methods: {
          getGoodsList() {
            Axios.get('/goods').then((result)=> {
              var res = result.data.result;
              this.goodsList = res.list;

            })
          },
          // 注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
          //同理 mounted也不能用箭头函数
          setPriceFilter(index) {
            console.log("index : "+index)
            this.priceChecked = index;
          },
          showFilterPop() {
            this.overFlag = true;

          },
          closePop() {
            this.overFlag = false;
          }
        },

    }
</script>

<style scoped>

</style>
