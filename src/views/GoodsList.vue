<template>
    <div>
      <body>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <div class="accessory-result-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur" @click="sortGoodsDefault()">默认</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="#"><img v-lazy="'/static/'+item.productImage" :key="item.productId" alt=""></a>
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
              <!--vue-infinete-scroll插件-->
               <div class="view-more-normal"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance=20>
                 <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
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
            sortFlag: true,
            page: 1,
            pageSize: 8,
            busy:true,
            loading:false,
            priceFilter: [
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
          getGoodsList(flag) {
            var param = {
              page: this.page,
              pageSize: this.pageSize,
              sort: this.sortFlag?1:-1,
              priceLevel: this.priceChecked
            }
            this.loading =  true;
            Axios.get('http://localhost:3000/goods',{
              params:param
            }).then((result)=> {
              var res = result.data;
              this.loading = false;
              if(res.status == "0"){
                if(flag) {
                  this.goodsList = this.goodsList.concat(res.result.list);
                  console.log(res);
                  if(res.result.count == 0){
                    this.busy = true;
                  }else{
                    this.busy = false;
                  }
                }else {
                  this.goodsList = res.result.list;
                  this.busy = false;
                }
              }else {
                 this.goodsList = [];
              }

            })
          },
          // 注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
          //同理 mounted也不能用箭头函数

          sortGoodsDefault() {
            this.sortFlag = true;
            this.page = 1;
            this.getGoodsList();
          },
          sortGoods() {
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },
          loadMore() {
            this.busy = true;//这有什么用 滚动不可生效
            setTimeout(()=>{
              this.page++;
              this.getGoodsList(true);
            },500)
          },
          setPriceFilter(index) {
            console.log("index : "+index)
            this.priceChecked = index;
            this.page = 1;
            this.getGoodsList();
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
