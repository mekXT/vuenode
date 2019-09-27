<template>
    <div>

      <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.listItem">
          {{item.itemName}}
        </el-menu-item>
      </el-menu>

    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        data() {
            return {
              navList:[
                {listItem:"/xthome",itemName:"首页数据"},
                {listItem:"/xtsbsj",itemName:"随笔数据"},
                {listItem:"/xtgrsj",itemName:"个人数据"}
              ]
            }
        }
    }
</script>
